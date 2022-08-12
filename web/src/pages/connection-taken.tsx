import React from "react";
import { Button } from "../ui/Button";

interface ConnectionTakenProps {}

const ConnectionTaken: React.FC<ConnectionTakenProps> = ({}) => {
  return (
    <div className="flex w-full h-full flex-col items-center justify-center p-8">
      <h4 className="text-primary-100 mb-4">
        Your connection was taken by an other client. Check if it is an browser
        tab
      </h4>
      <Button
        size="medium"
        onClick={() => {
          window.location.href = window.location.origin + "/dash";
        }}
      >
        Reconnect
      </Button>
    </div>
  );
};

export default ConnectionTaken;
