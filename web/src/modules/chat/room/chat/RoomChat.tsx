import React from "react";
import { RoomChatInput } from "./RoomChatInput";
import { RoomMessages } from "./RoomMessages";
import { HeaderController } from "../../../display/HeaderController";
import { useScreenType } from "../../../../hooks/useScreenType";

interface RoomChatProps {
  room: any;
}

export const RoomChat: React.FC<RoomChatProps> = ({ room }) => {
  const screenType = useScreenType();

  return (
    <>
      <HeaderController title={room.name} />
      <div className="flex flex-col w-full bg-primary-800 h-full">
        <RoomMessages room={room} />
        <div
          className={`sticky bottom-3 bg-primary-800 ${
            screenType === "fullscreen" || screenType === "1-cols"
              ? "flex-1"
              : ""
          }`}
        >
          <RoomChatInput />
        </div>
      </div>
    </>
  );
};
