import React from "react";
import { MiddlePanel } from "../../layouts/GridPanels";
import { RoomChat } from "./chat/RoomChat";

interface RoomControllerProps {}

export const RoomController: React.FC<RoomControllerProps> = () => {
  return (
    <MiddlePanel>
      <RoomChat />
    </MiddlePanel>
  );
};
