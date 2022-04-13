import React from "react";
import { MainLayout } from "./MainLayout";
import { LeftPannel, RightPanel } from "./Panels";

export const DesktopLayout: React.FC = ({ children }) => {
  return (
    <MainLayout leftPanel={<LeftPannel />} rightPanel={<RightPanel />}>
      {children}
    </MainLayout>
  );
};
