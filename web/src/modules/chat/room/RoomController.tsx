import React from "react";

import { HeaderController } from "../../display/HeaderController";
import { ChatLayout } from "../../layouts/ChatLayout";
import { RoomChat } from "./RoomChat";
import { LeftPanel } from "../LeftPanel";
import { MiddlePanel } from "../../layouts/GridPanels";
import { RoomChatRightPanel } from "./RoomChatRightPanel";

export const RoomController: React.FC = () => {
  return (
    <ChatLayout leftPanel={<LeftPanel />} rightPanel={<RoomChatRightPanel />}>
      <HeaderController title="Group name" embed={{}} />
      <MiddlePanel>
        <RoomChat />
      </MiddlePanel>
    </ChatLayout>
  );
};
