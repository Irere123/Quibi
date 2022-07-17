import React from "react";
import { MiddlePanel } from "../layouts/GridPanels";
import { MainLayout } from "../layouts/MainLayout";
import { RightPanel } from "../dashboard/Panels";
import { LeftPanel } from "./Panels";

export const AccountLayout: React.FC = ({ children }) => {
  let body = (
    <MainLayout leftPanel={<LeftPanel />} rightPanel={<RightPanel />}>
      <MiddlePanel>{children}</MiddlePanel>
    </MainLayout>
  );
  return <>{body}</>;
};
