import React from "react";
import { useVerifyLoggedIn } from "./useVerifyLoggedIn";

interface WaitForWsAndAuthProps {
  children?: React.ReactNode;
}

export const WaitForWsAndAuth: React.FC<WaitForWsAndAuthProps> = ({
  children,
}) => {
  if (!useVerifyLoggedIn()) {
    return null;
  }

  return <>{children}</>;
};
