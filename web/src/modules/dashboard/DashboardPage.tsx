import React from "react";

import { HeaderController } from "../components/HeaderController";
import { DesktopLayout } from "../layouts/DesktopLayout";
import { FeedController } from "./FeedController";

export const DashboardPage: React.FC = () => {
  return (
    <div className="flex w-full">
      <DesktopLayout>
        <HeaderController embed={{}} title="Dashboard" />
        <FeedController />
      </DesktopLayout>
    </div>
  );
};
