import React from "react";
import { MainLayout } from "./MainLayout";
import { LeftPanel, RightPanel } from "./Panels";

interface Props {
  children?: React.ReactNode;
}

export const DesktopLayout: React.FC<Props> = ({ children }) => {
  return (
    <MainLayout leftPanel={<LeftPanel />} rightPanel={<RightPanel />}>
      {children}
    </MainLayout>
  );
};
