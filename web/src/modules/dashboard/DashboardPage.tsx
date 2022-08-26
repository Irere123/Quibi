import React from "react";
import { useTypeSafeTranslation } from "../../hooks/useTypeSafeTranslation";
import { PageComponent } from "../../types/PageComponent";
import { WaitForWsAndAuth } from "../auth/WaitForWsAndAuth";
import { HeaderController } from "../display/HeaderController";
import { DesktopLayout } from "../layouts/DesktopLayout";
import { FeedController } from "./FeedController";

interface BoardPageProps {}

export const DashboardPage: PageComponent<BoardPageProps> = () => {
  const { t } = useTypeSafeTranslation();

  return (
    <WaitForWsAndAuth>
      <DesktopLayout>
        <HeaderController embed={{}} title={t("header.dashboard")} />
        <FeedController />
      </DesktopLayout>
    </WaitForWsAndAuth>
  );
};

DashboardPage.ws = true;
