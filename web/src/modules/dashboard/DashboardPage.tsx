import React from "react";
import { useTypeSafeTranslation } from "../../hooks/useTypeSafeTranslation";

import { HeaderController } from "../components/HeaderController";
import { DesktopLayout } from "../layouts/DesktopLayout";
import { FeedController } from "./FeedController";

export const DashboardPage: React.FC = () => {
  const { t } = useTypeSafeTranslation();

  return (
    <div className="flex w-full">
      <DesktopLayout>
        <HeaderController embed={{}} title={t("header.dashboard")} />
        <FeedController />
      </DesktopLayout>
    </div>
  );
};
