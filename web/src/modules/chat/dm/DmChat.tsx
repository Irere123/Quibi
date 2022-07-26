import React from "react";
import { ChatInput } from "../ChatInput";
import { DmChatHeader } from "./DmChatHeader";
import { DmMessages } from "./DmMessages";

export const DmChat: React.FC = () => {
  return (
    <div className="flex flex-1 overflow-y-auto w-full mb-7 bg-primary-800 h-full rounded-lg">
      <div className="flex flex-1 w-full flex-col">
        <DmChatHeader />
        <DmMessages />
        <ChatInput />
      </div>
    </div>
  );
};