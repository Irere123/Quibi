import React from "react";

import { HeaderController } from "../../display/HeaderController";
import { ChatLayout } from "../../layouts/ChatLayout";
import { RoomChat } from "./RoomChat";
import { RightPanel } from "./RightPanel";
import { LeftPanel } from "./LeftPanel";
import { MiddlePanel } from "../../layouts/GridPanels";

export const RoomController: React.FC = () => {
  return (
    <ChatLayout leftPanel={<LeftPanel />} rightPanel={<RightPanel />}>
      <HeaderController title="Group name" embed={{}} />
      <MiddlePanel>
        <RoomChat />
      </MiddlePanel>
    </ChatLayout>
  );
};
