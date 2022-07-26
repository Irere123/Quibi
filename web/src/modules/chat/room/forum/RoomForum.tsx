import React from "react";
import { ChatInput } from "../../ChatInput";
import { RoomForumContent } from "./RoomForumContent";
import { RoomForumHeader } from "../../../../ui/RoomForumHeader";

export const RoomForum: React.FC = () => {
  return (
    <div className="flex flex-1 overflow-y-auto w-full mb-3 bg-primary-800 h-full rounded-lg">
      <div className="flex flex-1 w-full flex-col">
        <RoomForumHeader
          description="Here we talk the things a software engineer might need the best way of chat"
          title="The Software engineer hangout"
          names={["Irere Emmy", "Lebron James"]}
          onTitleClick={() => console.log("Hello world")}
        />
        <RoomForumContent />
        <ChatInput />
      </div>
    </div>
  );
};
