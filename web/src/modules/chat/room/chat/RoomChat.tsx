import React from "react";
import { RoomChatInput } from "./RoomChatInput";
import { RoomMessages } from "./RoomMessages";

import { RoomChatHeader } from "./RoomChatHeader";

export const RoomChat: React.FC = () => {
  return (
    <div className="flex flex-1 overflow-y-auto w-full mb-3 bg-primary-800 h-full rounded-lg">
      <div className="flex flex-1 w-full flex-col">
        <RoomChatHeader />
        <RoomMessages />
        <RoomChatInput />
      </div>
    </div>
  );
};
