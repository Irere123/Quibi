import React from "react";
import { MainLayout } from "./MainLayout";
import { LeftPanel, RightPanel } from "./Panels";

export const DesktopLayout: React.FC = ({ children }) => {
  return (
    <MainLayout leftPanel={<LeftPanel />} rightPanel={<RightPanel />}>
      {children}
    </MainLayout>
  );
};
