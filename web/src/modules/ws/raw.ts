import ReconnectingWebSocket from "reconnecting-websocket";
import { v4 as generateUuid } from "uuid";
import { apiBaseUrl, __prod__ } from "../../lib/constants";
import { User, UUID } from "./types";

const heartbeatInterval = 8000;
const wsProtocol = __prod__ ? "wss" : "ws";
export const apiUrl = apiBaseUrl.replace("http", wsProtocol) + "/socket";
const connectionTimeout = 15000;

export type Token = string;
export type FetchID = UUID;
export type Opcode = string;
export type Logger = (
  direction: "in" | "out",
  opcode: Opcode,
  data?: unknown,
  fetchId?: FetchID,
  raw?: string
) => void;

export type ListenerHandler<Data = unknown> = (
  data: Data,
  fetchId?: FetchID
) => void;
export type Listener<Data = unknown> = {
  opcode: Opcode;
  handler: ListenerHandler<Data>;
};

export type Connection = {
  close: () => void;
  once: <Data = unknown>(
    opcode: Opcode,
    handler: ListenerHandler<Data>
  ) => void;
  addListener: <Data = unknown>(
    opcode: Opcode,
    handler: ListenerHandler<Data>
  ) => () => void;
  user: User;
  initialCurrentQuizId?: string;
  send: (opcode: Opcode, data: unknown, fetchId?: FetchID) => void;
  fetch: (
    opcode: Opcode,
    data: unknown,
    doneOpcode?: Opcode
  ) => Promise<unknown>;
};

// probably want to remove token/refreshToken
// better to use getAuthOptions
// when ws tries to reconnect it should use current tokens not the ones it initializes with
export const connect = (
  token: Token,
  refreshToken: Token,
  {
    logger = () => {},
    onConnectionTaken = () => {},
    onClearTokens = () => {},
    url = apiUrl,
    fetchTimeout,
    getAuthOptions,
    waitToReconnect,
  }: {
    logger?: Logger;
    onConnectionTaken?: () => void;
    onClearTokens?: () => void;
    url?: string;
    fetchTimeout?: number;
    waitToReconnect?: boolean;
    getAuthOptions?: () => Partial<{
      token: Token;
      refreshToken: Token;
      currentQuizId: string | null;
    }>;
  }
): Promise<Connection> =>
  new Promise((resolve, reject) => {
    const socket = new ReconnectingWebSocket(url, [], {
      connectionTimeout,
      WebSocket,
    });
    const apiSend = (opcode: Opcode, data: unknown, fetchId?: FetchID) => {
      if (socket.readyState !== socket.OPEN) return;

      const raw = `{"op":"${opcode}","d":${JSON.stringify(data)}${
        fetchId ? `,"fetchId":"${fetchId}"` : ""
      }}`;

      socket.send(raw);
      logger("out", opcode, data, fetchId, raw);
    };

    const listeners: Listener[] = [];

    // close & message listener needs to be outside of open
    // this prevents multiple listeners from being created on reconnect
    socket.addEventListener("close", (error) => {
      if (error.code === 4001) {
        socket.close();
        onClearTokens();
      } else if (error.code === 4003) {
        socket.close();
        onConnectionTaken();
      } else if (error.code === 4004) {
        socket.close();
        onClearTokens();
      }

      if (!waitToReconnect) reject(error);
    });

    socket.addEventListener("message", (e) => {
      if (e.data === `"pong"`) {
        logger("in", "pong");

        return;
      }

      const message = JSON.parse(e.data);

      logger("in", message.op, message.d, message.fetchId, e.data);

      if (message.op === "auth-good") {
        const connection: Connection = {
          close: () => socket.close(),
          once: (opcode, handler) => {
            const listener = { opcode, handler } as Listener<unknown>;

            listener.handler = (...params) => {
              handler(...(params as Parameters<typeof handler>));
              listeners.splice(listeners.indexOf(listener), 1);
            };

            listeners.push(listener);
          },
          addListener: (opcode, handler) => {
            const listener = { opcode, handler } as Listener<unknown>;

            listeners.push(listener);

            return () => listeners.splice(listeners.indexOf(listener), 1);
          },
          user: message.d.user,
          send: apiSend,
          fetch: (opcode: Opcode, parameters: unknown, doneOpcode?: Opcode) =>
            new Promise((resolveFetch, rejectFetch) => {
              // tmp fix
              // this is to avoid ws events queuing up while socket is closed
              // then it reconnects and fires before auth goes off
              // and you get logged out
              if (socket.readyState !== socket.OPEN) {
                rejectFetch(new Error("websocket not connected"));

                return;
              }

              const fetchId: FetchID | false = !doneOpcode && generateUuid();
              let timeoutId: NodeJS.Timeout | null = null;
              const unsubscribe = connection.addListener(
                doneOpcode ?? "fetch_done",
                (data, arrivedId) => {
                  if (!doneOpcode && arrivedId !== fetchId) return;

                  if (timeoutId) clearTimeout(timeoutId);

                  unsubscribe();
                  resolveFetch(data);
                }
              );

              if (fetchTimeout) {
                timeoutId = setTimeout(() => {
                  unsubscribe();
                  rejectFetch(new Error("timed out"));
                }, fetchTimeout);
              }

              apiSend(opcode, parameters, fetchId || undefined);
            }),
        };

        resolve(connection);
      } else {
        listeners
          .filter(({ opcode }) => opcode === message.op)
          .forEach((it) => it.handler(message.d, message.fetchId));
      }
    });

    socket.addEventListener("open", () => {
      const id = setInterval(() => {
        if (socket.readyState === socket.CLOSED) {
          clearInterval(id);
        } else {
          socket.send("ping");
          logger("out", "ping");
        }
      }, heartbeatInterval);

      apiSend("auth", {
        accessToken: token,
        refreshToken,
        currentQuizId: null,
        ...getAuthOptions?.(),
      });
    });
  });
