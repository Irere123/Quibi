import React from "react";
import { MiddlePanel } from "../layouts/GridPanels";
import { MainLayout } from "../layouts/MainLayout";
import { LeftPannel, RightPanel } from "../layouts/Panels";

export const PeoplePage: React.FC = () => {
  return (
    <MainLayout leftPanel={<LeftPannel />} rightPanel={<RightPanel />}>
      <MiddlePanel>
        <p>People</p>
      </MiddlePanel>
    </MainLayout>
  );
};
