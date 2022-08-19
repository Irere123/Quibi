import React from "react";
import { CenterLoader } from "../../../ui/CenterLoader";
import { MiddlePanel } from "../../layouts/GridPanels";
import { useGetRoomFromQueryParams } from "../useGetRoomFromQueryParams";
import { RoomChat } from "./chat/RoomChat";
import { RoomChatHeader } from "./RoomChatHeader";

interface RoomControllerProps {}

export const RoomController: React.FC<RoomControllerProps> = () => {
  const { data, isLoading } = useGetRoomFromQueryParams();

  if (isLoading) {
    return <CenterLoader />;
  }

  return (
    <MiddlePanel stickyChildren={<RoomChatHeader room={data} />}>
      <RoomChat room={data} />
    </MiddlePanel>
  );
};
