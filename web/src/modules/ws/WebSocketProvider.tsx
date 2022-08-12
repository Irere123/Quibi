import React, { ReactChild, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/router";
import { raw, User } from ".";
import { useTokenStore } from "../auth/useTokenStore";
import { apiUrl } from "./raw";

interface WebSocketProvoderProps {
  shouldConnect: boolean;
  children?: ReactChild;
}

type V = raw.Connection | null;

export const WebSocketContext = React.createContext<{
  conn: V;
  setUser: (u: User) => void;
  setConn: (c: raw.Connection | null) => void;
}>({ conn: null, setUser: () => {}, setConn: () => {} });

export const WebSocketProvoder: React.FC<WebSocketProvoderProps> = ({
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
      raw
        .connect("", "", {
          url: apiUrl,
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
          setUser: (u: User) => {
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
