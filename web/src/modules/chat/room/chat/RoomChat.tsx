import React from "react";
import { RoomChatInput } from "./RoomChatInput";
import { RoomMessages } from "./RoomMessages";

import { RoomChatHeader } from "./RoomChatHeader";
import { useGetRoomFromQueryParams } from "../../useGetRoomFromQueryParams";
import { CenterLoader } from "../../../../ui/CenterLoader";
import { HeaderController } from "../../../display/HeaderController";

export const RoomChat: React.FC = () => {
  const { data, isLoading } = useGetRoomFromQueryParams();

  if (isLoading) {
    return <CenterLoader />;
  }

  return (
    <div className="flex flex-1 w-full mb-3 bg-primary-800 h-full rounded-lg">
      <HeaderController title={data.name} />
      <div className="flex flex-1 w-full flex-col">
        <RoomChatHeader room={data} />
        <RoomMessages room={data} />
        <RoomChatInput />
      </div>
    </div>
  );
};
