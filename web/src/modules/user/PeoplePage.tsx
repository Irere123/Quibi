import React from "react";
import { HeaderController } from "../display/HeaderController";
import { MainLayout } from "../layouts/MainLayout";
import { LeftPanel, RightPanel } from "../layouts/Panels";
import { PeopleController } from "./PeopleController";

export const PeoplePage: React.FC = () => {
  return (
    <MainLayout leftPanel={<LeftPanel />} rightPanel={<RightPanel />}>
      <HeaderController title="People" />
      <PeopleController />
    </MainLayout>
  );
};
