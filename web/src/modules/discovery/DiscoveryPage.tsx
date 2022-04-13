import React from "react";
import { MiddlePanel } from "../layouts/GridPanels";
import { MainLayout } from "../layouts/MainLayout";

export const DiscoveryPage: React.FC = () => {
  return (
    <MainLayout>
      <MiddlePanel>
        <h1>Discover</h1>
      </MiddlePanel>
    </MainLayout>
  );
};
