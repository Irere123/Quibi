import React from "react";
import { useConn } from "../../hooks/useConn";
import { useTypeSafeTranslation } from "../../hooks/useTypeSafeTranslation";
import { PageComponent } from "../../types/PageComponent";
import { ProfileHeader } from "../../ui/mobile/MobileHeader";
import { WaitForWsAndAuth } from "../auth/WaitForWsAndAuth";
import { HeaderController } from "../display/HeaderController";
import { DesktopLayout } from "../layouts/DesktopLayout";
import { FeedController } from "./FeedController";

interface BoardPageProps {}

export const DashboardPage: PageComponent<BoardPageProps> = () => {
  const { t } = useTypeSafeTranslation();
  const conn = useConn();

  return (
    <DesktopLayout>
      <HeaderController embed={{}} title={t("header.dashboard")} />
      <FeedController />
    </DesktopLayout>
  );
};

DashboardPage.ws = true;
