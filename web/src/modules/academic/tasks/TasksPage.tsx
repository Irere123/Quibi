import React from "react";
import { Rocket } from "../../../icons";
import { AccountPageHeader } from "../../../ui/AccountPageHeader";
import { HeaderController } from "../../display/HeaderController";
import { MiddlePanel } from "../../layouts/GridPanels";
import { MainLayout } from "../../layouts/MainLayout";
import { LeftPanel } from "../../layouts/Panels";

export const TasksPage: React.FC = () => {
  return (
    <MainLayout leftPanel={<LeftPanel />}>
      <HeaderController title="Goals" />
      <MiddlePanel
        stickyChildren={<AccountPageHeader icon={<Rocket />} title={"Goals"} />}
      >
        <p>Hello world</p>
      </MiddlePanel>
    </MainLayout>
  );
};
