import React from "react";
import { createWebSocket } from "../modules/ws/createWebSocket";
import { Button } from "./Button";

interface WsKilledMessageProps {}

export const WsKilledMessage: React.FC<WsKilledMessageProps> = ({}) => {
  return (
    <div className="flex items-center h-full justify-around">
      <div>
        <div className={`px-4`}>
          <div className={`mb-4 mt-8 text-xl`}>
            websocket was killed by server
          </div>
          <Button
            onClick={() => {
              createWebSocket(true);
            }}
            size="medium"
          >
            Reconnect
          </Button>
        </div>
      </div>
    </div>
  );
};
