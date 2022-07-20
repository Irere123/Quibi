import React from "react";
import { HeaderController } from "../../display/HeaderController";
import { MainLayout } from "../../layouts/MainLayout";
import { RoomChatController } from "./RoomChatController";
import { RightPanel } from "../RightPanel";
import { LeftPanel } from "../LeftPanel";
import { MiddlePanel } from "../../layouts/GridPanels";

export const GroupChat: React.FC = () => {
  return (
    <MainLayout leftPanel={<LeftPanel />} rightPanel={<RightPanel />}>
      <HeaderController title="Group name" embed={{}} />
      <MiddlePanel>
        <RoomChatController />
      </MiddlePanel>
    </MainLayout>
  );
};
