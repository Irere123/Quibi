import { useRouter } from "next/router";
import React, { ReactNode, useContext, useEffect } from "react";
import { showErrorToast } from "../lib/showErrorToast";
import { WebSocketContext } from "../modules/ws/WebSocketProvider";

export const useWsMainHandler = () => {
  const { push } = useRouter();
  const { conn } = useContext(WebSocketContext);

  useEffect(() => {
    if (!conn) {
      return;
    }

    const unsubs = [
      conn.addListener<any>("error", (message) => {
        showErrorToast(message);
      }),
    ];

    return () => {
      unsubs.forEach((u) => u());
    };
  });
};

export const WsMainHandlerProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  useWsMainHandler();
  return <>{children}</>;
};
