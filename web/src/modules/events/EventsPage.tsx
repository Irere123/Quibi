import React from "react";
import { HeaderController } from "../display/HeaderController";
import { MiddlePanel } from "../layouts/GridPanels";
import { MainLayout } from "../layouts/MainLayout";
import { LeftPanel } from "../layouts/Panels";

export const EventsPage: React.FC = () => {
  return (
    <MainLayout leftPanel={<LeftPanel />}>
      <HeaderController title="Events" />
      <MiddlePanel>
        <p>Hello world</p>
      </MiddlePanel>
    </MainLayout>
  );
};
