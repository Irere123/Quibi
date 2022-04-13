import React from "react";
import { HeaderController } from "../components/HeaderController";
import { MiddlePanel } from "../layouts/GridPanels";

import { MainLayout } from "../layouts/MainLayout";
import { LeftPannel } from "../layouts/Panels";
import { TopicsController } from "./TopicsController";

export const TopicsPage: React.FC = () => {
  return (
    <MainLayout leftPanel={<LeftPannel />}>
      <HeaderController embed={{}} title="Topics" />
      <MiddlePanel>
        <TopicsController />
      </MiddlePanel>
    </MainLayout>
  );
};
