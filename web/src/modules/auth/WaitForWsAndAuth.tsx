import React, { useContext } from "react";
import { useSocketStatus } from "../../stores/useSocketStatus";
import { InfoText } from "../../ui/InfoText";
import { WebSocketContext } from "../ws/WebSocketProvider";
import { useVerifyLoggedIn } from "./useVerifyLoggedIn";

interface WaitForWsAndAuthProps {
  children?: React.ReactNode;
}

export const WaitForWsAndAuth: React.FC<WaitForWsAndAuthProps> = ({
  children,
}) => {
  const { conn } = useContext(WebSocketContext);

  if (!useVerifyLoggedIn()) {
    return null;
  }

  // TODO: make this better
  if (!conn) {
    return <InfoText>Loading...</InfoText>;
  }

  return <>{children}</>;
};
