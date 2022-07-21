import React from "react";
import { ChatInput } from "../ChatInput";
import { RoomForumContent } from "./RoomForumContent";
import { RoomForumHeader } from "./RooomForumHeader";

export const RoomForum: React.FC = () => {
  return (
    <div className="flex flex-1 overflow-y-auto w-full mb-7 bg-primary-800 h-full rounded-lg">
      <div className="flex flex-1 w-full flex-col">
        <RoomForumHeader />
        <RoomForumContent />
        <ChatInput />
      </div>
    </div>
  );
};
