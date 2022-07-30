import React from "react";
import { HeaderController } from "../modules/display/HeaderController";
import { Button } from "../ui/Button";

interface ConnectionTakenProps {}

const ConnectionTaken: React.FC<ConnectionTakenProps> = ({}) => {
  return (
    <div className="flex w-full h-full flex-col items-center justify-center p-8">
      <HeaderController title="Connection taken" />
      <h4 className="text-primary-100 mb-4">
        WebSocket was killed by the server. This usually happens when you open
        the website in another tab.
      </h4>
      <Button
        onClick={() => {
          window.location.href = window.location.origin + "/dash";
        }}
        size="medium"
      >
        Reconnect
      </Button>
    </div>
  );
};

export default ConnectionTaken;
