import React from "react";
import { HeaderController } from "../../display/HeaderController";
import { MiddlePanel } from "../../layouts/GridPanels";
import { MainLayout } from "../../layouts/MainLayout";
import { RightPanel } from "../RightPanel";
import { LeftPanel } from "../LeftPanel";
import { PersonChatController } from "./PersonChatController";

export const PersonChat: React.FC = () => {
  return (
    <MainLayout leftPanel={<LeftPanel />} rightPanel={<RightPanel />}>
      <HeaderController title="Person name" embed={{}} />
      <MiddlePanel>
        <PersonChatController />
      </MiddlePanel>
    </MainLayout>
  );
};
