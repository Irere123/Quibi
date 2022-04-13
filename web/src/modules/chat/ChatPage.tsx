import React from "react";

import { HeaderController } from "../components/HeaderController";
import { MiddlePanel } from "../layouts/GridPanels";
import { MainLayout } from "../layouts/MainLayout";
import { GroupChatController } from "./group/GroupChatController";
import { LeftPanel, RightPanel } from "./Panels";

export const ChatPage: React.FC = () => {
  return (
    <MainLayout leftPanel={<LeftPanel />} rightPanel={<RightPanel />}>
      <HeaderController embed={{}} title="Chat" />
      <MiddlePanel>
        <GroupChatController />
      </MiddlePanel>
    </MainLayout>
  );
};
