import React from "react";
import { WaitForWsAndAuth } from "../auth/WaitForWsAndAuth";
import { MainLayout } from "./MainLayout";
import { LeftPanel, RightPanel } from "./Panels";
import { TabletSidebar } from "./TabletSidebar";

interface Props {
  children?: React.ReactNode;
  mobileHeader?: React.ReactNode;
}

export const DesktopLayout: React.FC<Props> = ({
  children,
  mobileHeader = undefined,
}) => {
  return (
    <WaitForWsAndAuth>
      <MainLayout
        floatingQuizInfo={null}
        tabletSidebar={<TabletSidebar />}
        leftPanel={<LeftPanel />}
        rightPanel={<RightPanel />}
        mobileHeader={mobileHeader}
      >
        {children}
      </MainLayout>
    </WaitForWsAndAuth>
  );
};
