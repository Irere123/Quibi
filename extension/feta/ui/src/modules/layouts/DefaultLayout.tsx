import React from "react";
import { HeaderController } from "../display/HeaderController";
import { MiddlePanel } from "./GridPanels";
import { MainLayout } from "./MainLayout";
import { LeftPanel } from "./Panels";

interface DefaultLayoutProps {
  stickyHeader?: React.ReactNode;
}

export const DefaultLayout: React.FC<DefaultLayoutProps> = ({
  children,
  stickyHeader,
}) => {
  return (
    <MainLayout leftPanel={<LeftPanel />}>
      <HeaderController />
      <MiddlePanel stickyChildren={stickyHeader}>{children}</MiddlePanel>
    </MainLayout>
  );
};
