import React from "react";

import { HeaderController } from "../../display/HeaderController";
import { MainLayout } from "../../layouts/MainLayout";
import { RoomChat } from "./RoomChat";
import { RightPanel } from "../RightPanel";
import { LeftPanel } from "../LeftPanel";
import { MiddlePanel } from "../../layouts/GridPanels";

export const RoomChatController: React.FC = () => {
  return (
    <MainLayout leftPanel={<LeftPanel />} rightPanel={<RightPanel />}>
      <HeaderController title="Group name" embed={{}} />
      <MiddlePanel>
        <RoomChat />
      </MiddlePanel>
    </MainLayout>
  );
};
