import React from "react";
import { useScreenType } from "../hooks/useScreenType";

interface AccountGridProps {
  className?: string;
}

export const AccountInnerGrid: React.FC<AccountGridProps> = ({
  children,
  className = "",
}) => {
  const screenType = useScreenType();

  let gridTemplateColumns = "200px 800px 100px";
  let myClassName = ``;

  if (screenType === "2-cols") {
    gridTemplateColumns = "60px 640px 325px";
  } else if (screenType === "1-cols") {
    gridTemplateColumns = "60px 640px";
  } else if (screenType === "fullscreen") {
    myClassName = "w-full px-3";
    gridTemplateColumns = "1fr";
  }

  return (
    <div
      id="main"
      className={`relative ${myClassName} ${className}`}
      style={{
        display: screenType === "fullscreen" ? "flex" : "grid",
        gridTemplateColumns,
        columnGap: 60,
      }}
    >
      {children}
    </div>
  );
};

export const MainGrid: React.FC<AccountGridProps> = ({ children }) => {
  return (
    <div className={`flex justify-center w-full min-h-screen bg-primary-900`}>
      <AccountInnerGrid>{children}</AccountInnerGrid>
    </div>
  );
};
