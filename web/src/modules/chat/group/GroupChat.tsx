import React from "react";
import { HeaderController } from "../../components/HeaderController";
import { MainLayout } from "../../layouts/MainLayout";
import { GroupChatController } from "./GroupChatController";
import { LeftPanel, RightPanel } from "../Panels";
import { MiddlePanel } from "../../layouts/GridPanels";

export const GroupChat: React.FC = () => {
  return (
    <MainLayout leftPanel={<LeftPanel />} rightPanel={<RightPanel />}>
      <HeaderController title="Group name" embed={{}} />
      <MiddlePanel>
        <GroupChatController />
      </MiddlePanel>
    </MainLayout>
  );
};
