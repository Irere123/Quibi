import React from "react";
import { useScreenType } from "../../hooks/useScreenType";
import { ChatInnerGrid } from "../../ui/MainGrid";
import { LeftPanel, RightPanel } from "./GridPanels";

interface MainLayoutProps {
  leftPanel?: React.ReactNode;
  rightPanel?: React.ReactNode;
  children?: React.ReactNode;
}

export const ChatLayout: React.FC<MainLayoutProps> = ({
  children,
  leftPanel = <div />,
  rightPanel = <div />,
}) => {
  const screenType = useScreenType();

  let middle = null;

  switch (screenType) {
    case "3-cols":
      middle = (
        <>
          <LeftPanel>{leftPanel}</LeftPanel>
          {children}
          <RightPanel>{rightPanel}</RightPanel>
        </>
      );
      break;
    case "2-cols":
      middle = (
        <>
          <LeftPanel>{leftPanel}</LeftPanel>
          {children}
          <RightPanel>{rightPanel}</RightPanel>
        </>
      );
      break;

    case "1-cols":
      middle = (
        <>
          <LeftPanel>{leftPanel}</LeftPanel>
          {children}
        </>
      );
      break;

    case "fullscreen":
      middle = <>{children}</>;
  }

  return (
    <>
      <div className={`flex flex-col items-center w-full`}>
        <ChatInnerGrid>{middle}</ChatInnerGrid>
      </div>
    </>
  );
};
