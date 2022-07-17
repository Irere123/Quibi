import React from "react";
import { ChatInnerGrid } from "../../ui/MainGrid";
import { LeftPanel, RightPanel } from "./GridPanels";

interface MainLayoutProps {
  leftPanel?: React.ReactNode;
  rightPanel?: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({
  children,
  leftPanel = <div />,
  rightPanel = <div />,
}) => {
  let middle = (
    <>
      <LeftPanel>{leftPanel}</LeftPanel>
      {children}
      <RightPanel>{rightPanel}</RightPanel>
    </>
  );

  return (
    <>
      <div
        className={`flex flex-col items-center w-full scrollbar-thin scrollbar-thumb-primary-700 `}
      >
        <ChatInnerGrid>{middle}</ChatInnerGrid>
      </div>
    </>
  );
};
