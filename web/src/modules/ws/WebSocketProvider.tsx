import { useRouter } from "next/router";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { connect, Connection } from "./createWebSocket";
import { apiBaseUrl } from "../../lib/constants";
import { useTokenStore } from "../auth/useTokenStore";

interface WebSocketProviderProps {
  shouldConnect: boolean;
}

type V = Connection | null;

export const WebSocketContext = React.createContext<{
  conn: V;
  setUser: (u: any) => void;
  setConn: (u: Connection | null) => void;
}>({
  conn: null,
  setUser: () => {},
  setConn: () => {},
});

export const WebSocketProvider: React.FC<WebSocketProviderProps> = ({
  shouldConnect,
  children,
}) => {
  const hasTokens = useTokenStore((s) => s.accessToken && s.refreshToken);
  const [conn, setConn] = useState<V>(null);
  const { replace } = useRouter();
  const isConnecting = useRef(false);

  useEffect(() => {
    if (!conn && shouldConnect && hasTokens && !isConnecting.current) {
      isConnecting.current = true;
      console.log(conn);
      connect("", "", {
        waitToReconnect: true,
        url: apiBaseUrl.replace("http", "ws") + "/socket",
        getAuthOptions: () => {
          const { accessToken, refreshToken } = useTokenStore.getState();

          return {
            accessToken,
            refreshToken,
          };
        },
        onConnectionTaken: () => {
          replace("/connection-taken");
        },
        onClearTokens: () => {
          console.log("clearing tokens...");
          useTokenStore
            .getState()
            .setTokens({ accessToken: "", refreshToken: "" });
          setConn(null);
          replace("/logout");
        },
      })
        .then((x) => {
          setConn(x);
        })
        .catch((err) => {
          if (err.code === 4001) {
            replace(`/?next=${window.location.pathname}`);
          }
        })
        .finally(() => {
          isConnecting.current = false;
        });
    }
  }, [conn, shouldConnect, hasTokens, replace]);

  useEffect(() => {
    if (!conn) {
      return;
    }

    return conn.addListener<{
      refreshToken: string;
      accessToken: string;
    }>("new-tokens", ({ refreshToken, accessToken }) => {
      useTokenStore.getState().setTokens({
        accessToken,
        refreshToken,
      });
    });
  }, [conn]);

  return (
    <WebSocketContext.Provider
      value={useMemo(
        () => ({
          conn,
          setConn,
          setUser: (u: any) => {
            if (conn) {
              setConn({
                ...conn,
                user: u,
              });
            }
          },
        }),
        [conn]
      )}
    >
      {children}
    </WebSocketContext.Provider>
  );
};
