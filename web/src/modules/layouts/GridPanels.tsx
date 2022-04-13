import React, { FC } from "react";
import { FixedGridPanel, GridPanel } from "../../ui/GridPanel";
import LeftHeader from "../../ui/header/LeftHeader";
import { MiddleHeader } from "../../ui/header/MiddleHeader";
import RightHeader from "../../ui/header/RightHeader";

interface LeftPanelProps {}

const HeaderWrapper: FC = ({ children }) => (
  <div className={`flex mb-7 h-6 items-center`}>{children}</div>
);

export const LeftPanel: React.FC<LeftPanelProps> = ({ children }) => {
  return (
    <FixedGridPanel>
      <HeaderWrapper>
        <LeftHeader />
      </HeaderWrapper>
      {children}
    </FixedGridPanel>
  );
};

export const MiddlePanel: React.FC<
  LeftPanelProps & { stickyChildren?: React.ReactNode }
> = ({ stickyChildren, children }) => {
  return (
    <GridPanel>
      <div className={`flex sticky w-full flex-col z-10 pt-5`}>
        <HeaderWrapper>
          <MiddleHeader />
        </HeaderWrapper>
        {stickyChildren}
      </div>
      {children}
    </GridPanel>
  );
};

export const RightPanel: React.FC<LeftPanelProps> = ({ children }) => {
  return (
    <FixedGridPanel>
      <HeaderWrapper>
        <RightHeader />
      </HeaderWrapper>
      {children}
    </FixedGridPanel>
  );
};
