import React from "react";
import { Notification } from "../../icons";

export const LeftPanel: React.FC = () => {
  return (
    <div>
      <div className="text-primary-200 flex gap-2 items-center">
        <Notification />
        <p>Notifications</p>
      </div>
    </div>
  );
};
