import React from "react";
import { useSocketStatus } from "../../stores/useSocketStatus";
import { useVerifyLoggedIn } from "./useVerifyLoggedIn";

interface WaitForWsAndAuthProps {}

export const WaitForWsAndAuth: React.FC<WaitForWsAndAuthProps> = ({
  children,
}) => {
  const { status } = useSocketStatus();
  if (!useVerifyLoggedIn()) {
    return null;
  }

  if (status === "connecting") {
    // @todo make this better
    return (
      <div className="flex">
        <h1 className="text-primary-100">Loading...</h1>
      </div>
    );
  }

  return <>{children}</>;
};
