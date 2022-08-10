import ReconnectingWebSocket from "reconnecting-websocket";
import { useTokenStore } from "../auth/useTokenStore";
import { v4 as uuidv4 } from "uuid";
import { apiBaseUrl, __prod__ } from "../../lib/constants";
import { useSocketStatus } from "../../stores/useSocketStatus";
import { useWsHandlerStore } from "../../stores/useWsHandlerStore";
import { queryClient } from "../../lib/queryClient";
import { WsParam } from "./types";
import { isServer } from "../../lib/isServer";

let socket: ReconnectingWebSocket | null;
let authGood = false;
let lastMsg = "";
const connectionTimeout = 15000;
const wsProtocol = __prod__ ? "wss" : "ws";
const apiUrl = apiBaseUrl.replace("http", wsProtocol) + "/socket";

export const auth_query = "auth";

if (!isServer) {
  window.addEventListener("online", () => {
    if (socket && socket.readyState === socket.CLOSED) {
      console.log("online triggered, calling ws.reconnect()");
      socket.reconnect();
    }
  });
}

export const closeWebSocket = () => {
  socket?.close();
};

export const createWebSocket = (force?: boolean) => {
  console.log("Creating websocket connection....");
  if (!force && socket) {
    console.log("ws already connected");
    return;
  } else {
    console.log("new ws instance incoming");
  }
  const { accessToken, refreshToken } = useTokenStore.getState();

  if (!accessToken || !refreshToken) {
    return;
  }

  useSocketStatus.getState().setStatus("connecting");

  socket = new ReconnectingWebSocket(apiUrl, [], { connectionTimeout });

  socket.addEventListener("close", ({ code, reason }) => {
    const { setStatus } = useSocketStatus.getState();
    authGood = false;
    if (code === 4001) {
      console.log("clearing tokens");
      useWsHandlerStore.getState().authHandler?.(null);
      useTokenStore.getState().setTokens({ accessToken: "", refreshToken: "" });
      socket?.close();
      socket = null;
      setStatus("closed");
    } else if (code === 4003) {
      socket?.close();
      socket = null;
      setStatus("closed-by-server");
    } else if (code === 4004) {
      socket?.close();
      socket = null;
    } else {
      // @todo do more of a status bar thing
      setStatus("closed");
    }
    console.log("ws closed", code, reason);
  });

  socket.addEventListener("open", () => {
    useSocketStatus.getState().setStatus("open");

    queryClient.prefetchQuery(
      auth_query,
      () =>
        wsAuthFetch({
          op: auth_query,
          d: {
            accessToken,
            refreshToken,
          },
        }),
      { staleTime: 0 }
    );

    console.log("ws opened");
    const id = setInterval(() => {
      if (socket && socket.readyState !== socket.CLOSED) {
        socket.send("ping");
      } else {
        clearInterval(id);
      }
    }, 8000);
  });

  socket.addEventListener("message", (e) => {
    // console.log(e.data);
    const json = JSON.parse(e.data as string);

    if (e.data === '"pong"') {
      return;
    }

    switch (json.op) {
      case "new-tokens": {
        useTokenStore.getState().setTokens({
          accessToken: json.d.accessToken,
          refreshToken: json.d.refreshToken,
        });
        break;
      }
      case "error": {
        console.error(json.d);
        break;
      }
      default: {
        const { handlerMap, fetchResolveMap, authHandler } =
          useWsHandlerStore.getState();
        if (json.op === "auth-good") {
          if (lastMsg) {
            socket?.send(lastMsg);
            lastMsg = "";
          }
          authGood = true;
          useSocketStatus.getState().setStatus("auth-good");
          if (authHandler) {
            authHandler(json.d);
          } else {
            console.error("something went wrong, authHandler is null");
          }
        }
        // console.log("ws: ", json.op);
        if (json.op in handlerMap) {
          handlerMap[json.op](json.d);
        } else if (
          json.op === "fetch_done" &&
          json.fetchId &&
          json.fetchId in fetchResolveMap
        ) {
          fetchResolveMap[json.fetchId](json.d);
        }
        break;
      }
    }
  });
};

export const wsend = (d: { op: string; d: any }) => {
  if (!authGood || !socket || socket.readyState !== socket.OPEN) {
    console.log("ws not ready");
    lastMsg = JSON.stringify(d);
  } else {
    socket?.send(JSON.stringify(d));
  }
};

export const wsAuthFetch = <T>(d: WsParam) => {
  return new Promise<T>((res, rej) => {
    if (!socket || socket.readyState !== socket.OPEN) {
      rej(new Error("can't connect to server"));
    } else {
      setTimeout(() => {
        rej(new Error("request timed out"));
      }, 10000); // 10 secs
      useWsHandlerStore.getState().addAuthHandler((d) => {
        if (d) {
          res(d);
        }
      });
      socket?.send(JSON.stringify(d));
    }
  });
};

export const wsFetch = <T>(d: WsParam) => {
  return new Promise<T>((res, rej) => {
    if (!authGood || !socket || socket.readyState !== socket.OPEN) {
      rej(new Error("can't connect to server"));
    } else {
      const fetchId = uuidv4();
      setTimeout(() => {
        useWsHandlerStore.getState().clearFetchListener(fetchId);
        rej(new Error("request timed out"));
      }, 10000); // 10 secs
      useWsHandlerStore.getState().addFetchListener(fetchId, (d) => {
        res(d);
      });
      socket?.send(JSON.stringify({ ...d, fetchId }));
    }
  });
};

export const wsMutation = (d: WsParam) => wsFetch(d);
export const wsMutationThrowError = (d: WsParam) =>
  wsFetch(d).then((x: any) => {
    if (x.error) {
      throw new Error(x.error);
    }

    return x;
  });
