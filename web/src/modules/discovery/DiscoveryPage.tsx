import React from "react";
import { DesktopLayout } from "../layouts/DesktopLayout";
import { DiscoverController } from "./DiscoverController";

export const DiscoveryPage: React.FC = () => {
  return (
    <DesktopLayout>
      <DiscoverController />
    </DesktopLayout>
  );
};
