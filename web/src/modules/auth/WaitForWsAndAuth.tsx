import React from "react";
import { useSocketStatus } from "../../stores/useSocketStatus";
import { InfoText } from "../../ui/InfoText";
import { useVerifyLoggedIn } from "./useVerifyLoggedIn";

interface WaitForWsAndAuthProps {
  children?: React.ReactNode;
}

export const WaitForWsAndAuth: React.FC<WaitForWsAndAuthProps> = ({
  children,
}) => {
  const { status } = useSocketStatus();
  if (!useVerifyLoggedIn()) {
    return null;
  }

  // TODO: make this better
  if (status === "connecting") {
    return <InfoText>Loading...</InfoText>;
  }

  return <>{children}</>;
};
