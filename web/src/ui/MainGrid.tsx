import React from "react";

interface DashboardGridProps {
  className?: string;
}

export const MainInnerGrid: React.FC<DashboardGridProps> = ({
  children,
  className = "",
}) => {
  let gridTemplateColumns = "235px 640px 325px";
  let myClassName = `w-full px-3`;

  return (
    <div
      id="main"
      className={`relative ${myClassName} ${className}`}
      style={{
        display: "grid",
        gridTemplateColumns,
        columnGap: 60,
      }}
    >
      {children}
    </div>
  );
};

export const ChatInnerGrid: React.FC<DashboardGridProps> = ({
  children,
  className = "",
}) => {
  let gridTemplateColumns = "220px 660px 320px";
  let myClassName = `w-full px-3`;

  return (
    <div
      id="main"
      className={`relative ${myClassName} ${className}`}
      style={{
        display: "grid",
        gridTemplateColumns,
        columnGap: 60,
      }}
    >
      {children}
    </div>
  );
};

export const MainGrid: React.FC<DashboardGridProps> = ({ children }) => {
  return (
    <div className={`flex justify-center w-full min-h-screen`}>
      <MainInnerGrid>{children}</MainInnerGrid>
    </div>
  );
};
