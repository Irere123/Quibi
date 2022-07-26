import React from "react";
import { HeaderController } from "../display/HeaderController";
import { MainLayout } from "../layouts/MainLayout";
import { LeftPannel, RightPanel } from "../layouts/Panels";
import { PeopleController } from "./PeopleController";

export const PeoplePage: React.FC = () => {
  return (
    <MainLayout leftPanel={<LeftPannel />} rightPanel={<RightPanel />}>
      <HeaderController title="People" />
      <PeopleController />
    </MainLayout>
  );
};
