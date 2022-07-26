import React from "react";
import { useScreenType } from "../../hooks/useScreenType";
import { AccountInnerGrid } from "../../ui/AccountGrid";
import { AccountLeftPanel } from "./GridPanels";

interface AccountLayoutProps {
  leftPanel?: React.ReactNode;
  tabletSidebar?: React.ReactNode;
}

export const AccountLayout: React.FC<AccountLayoutProps> = ({
  children,
  leftPanel = <div />,
}) => {
  const screenType = useScreenType();

  let middle = null;

  switch (screenType) {
    case "3-cols":
      middle = (
        <>
          <AccountLeftPanel>{leftPanel}</AccountLeftPanel>
          {children}
        </>
      );
      break;
    case "2-cols":
      middle = (
        <>
          <AccountLeftPanel>{leftPanel}</AccountLeftPanel>
          {children}
        </>
      );
      break;
    case "1-cols":
      middle = (
        <>
          <AccountLeftPanel>{leftPanel}</AccountLeftPanel>
          {children}
        </>
      );
      break;
    case "fullscreen":
      middle = <>{children}</>;
  }

  return (
    <>
      <div className="flex flex-col items-center w-full scrollbar-thin scrollbar-thumb-primary-700">
        <AccountInnerGrid>{middle}</AccountInnerGrid>
      </div>
    </>
  );
};
