import React from "react";
import { MiddlePanel } from "./GridPanels";
import { MainLayout } from "./MainLayout";
import { RightPanel, SettingsLeftPanel } from "./Panels";

interface SettingsLayoutProps {
  children?: React.ReactNode;
}

export const SettingsLayout: React.FC<SettingsLayoutProps> = ({ children }) => {
  return (
    <MainLayout leftPanel={<SettingsLeftPanel />} rightPanel={<RightPanel />}>
      <MiddlePanel>{children}</MiddlePanel>
    </MainLayout>
  );
};
