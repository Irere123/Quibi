import React from "react";
import { MainInnerGrid } from "../../components/MainGrid";
import { LeftPanel, RightPanel } from "./GridPanels";

interface MainLayoutProps {
  leftPanel?: React.ReactNode;
  rightPanel?: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({
  rightPanel = <div />,
  leftPanel = <div />,
  children,
}) => {
  const middle = (
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
        <MainInnerGrid>{middle}</MainInnerGrid>
      </div>
    </>
  );
};
