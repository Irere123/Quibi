import React from "react";
import { PovHeader } from "../../ui/PovHeader";
import { LeftPannel } from "../dashboard/Panels";
import { MiddlePanel } from "../layouts/GridPanels";
import { MainLayout } from "../layouts/MainLayout";
import { CommentsPanel } from "./CommentsPanel";

export const PovDetailPage: React.FC = () => {
  return (
    <MainLayout leftPanel={<LeftPannel />} rightPanel={<CommentsPanel />}>
      <MiddlePanel
        stickyChildren={<PovHeader avatar="" username="" createdAt="" />}
      >
        <h1>Discover</h1>
      </MiddlePanel>
    </MainLayout>
  );
};
