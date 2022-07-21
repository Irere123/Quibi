import React from "react";
import { HeaderController } from "../../display/HeaderController";
import { MiddlePanel } from "../../layouts/GridPanels";
import { MainLayout } from "../../layouts/MainLayout";
import { RoomChatRightPanel } from "../room/RoomChatRightPanel";
import { LeftPanel } from "../room/LeftPanel";
import { PersonChatController } from "./PersonChatController";

export const PersonChat: React.FC = () => {
  return (
    <MainLayout leftPanel={<LeftPanel />} rightPanel={<RoomChatRightPanel />}>
      <HeaderController title="Person name" embed={{}} />
      <MiddlePanel>
        <PersonChatController />
      </MiddlePanel>
    </MainLayout>
  );
};
