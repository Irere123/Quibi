import React from "react";
import router from "next/router";
import { useScreenType } from "../../hooks/useScreenType";
import { MainInnerGrid } from "../../ui/MainGrid";
import { FloatingQuizInfo } from "./FloatingQuizInfo";
import { LeftPanel, RightPanel } from "./GridPanels";
import { TabletSidebar } from "./TabletSidebar";
import { useConn } from "../../hooks/useConn";
import { ProfileHeader } from "../../ui/mobile/MobileHeader";
import {
  AccountIcon,
  AtIcon,
  ChatBubble,
  CompassIcon,
  GroupIcon,
  HomeIcon,
  PlusIcon,
  SchoolIcon,
} from "../../icons";
import { MobileNav } from "../../ui/mobile/MobileNav";

interface MainLayoutProps {
  floatingQuizInfo?: React.ReactNode;
  leftPanel?: React.ReactNode;
  rightPanel?: React.ReactNode;
  tabletSidebar?: React.ReactNode;
  mobileHeader?: React.ReactNode;
  children?: React.ReactNode;
  plusButtonURL?: string;
}

export const MainLayout: React.FC<MainLayoutProps> = ({
  children,
  leftPanel = <div />,
  rightPanel = <div />,
  tabletSidebar = <TabletSidebar />,
  floatingQuizInfo = <FloatingQuizInfo />,
  mobileHeader,
  plusButtonURL,
}) => {
  const screenType = useScreenType();
  const conn = useConn()!;
  const me = conn ? conn.user : undefined;
  const mHeader = mobileHeader || (
    <ProfileHeader
      avatar={me?.avatarUrl!}
      onSearchClick={() => router.push("/search")}
    />
  );

  const items = [
    { icon: <HomeIcon />, targetPath: "/dash" },
    { icon: <CompassIcon />, targetPath: "/explore" },
    { icon: <GroupIcon />, targetPath: "/explore-rooms" },
    { icon: <SchoolIcon />, targetPath: "/u/academic" },
  ];

  if (plusButtonURL) {
    items.push({ icon: <PlusIcon />, targetPath: plusButtonURL });
  }

  let middle = null;
  let prepend = null;

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
          <LeftPanel>{tabletSidebar}</LeftPanel>
          {children}
          <RightPanel>{rightPanel}</RightPanel>
        </>
      );
      break;
    case "1-cols":
      middle = (
        <>
          <LeftPanel>{tabletSidebar}</LeftPanel>
          {children}
        </>
      );
      break;
    case "fullscreen":
      prepend = (
        <>
          {mHeader}
          <MobileNav items={items}></MobileNav>
        </>
      );
      middle = (
        <>
          {children}
          {floatingQuizInfo}
        </>
      );
  }

  return (
    <>
      <div className="fixed top-0 left-0 w-full z-10">{prepend}</div>
      <div className="flex flex-col items-center w-full scrollbar-thin scrollbar-thumb-primary-700">
        <MainInnerGrid>{middle}</MainInnerGrid>
      </div>
    </>
  );
};
