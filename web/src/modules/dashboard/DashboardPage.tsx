import React from "react";
import { useTypeSafeTranslation } from "../../hooks/useTypeSafeTranslation";
import { WaitForWsAndAuth } from "../auth/WaitForWsAndAuth";

import { HeaderController } from "../display/HeaderController";
import { DesktopLayout } from "../layouts/DesktopLayout";
import { FeedController } from "./FeedController";

export const DashboardPage: React.FC = () => {
  const { t } = useTypeSafeTranslation();

  return (
    <WaitForWsAndAuth>
      <HeaderController embed={{}} title={t("header.dashboard")} />
      <DesktopLayout>
        <FeedController />
      </DesktopLayout>
    </WaitForWsAndAuth>
  );
};
