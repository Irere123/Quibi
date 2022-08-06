import React from "react";
import { Calendar } from "../../../icons";
import { AccountPageHeader } from "../../../ui/AccountPageHeader";
import { HeaderController } from "../../display/HeaderController";
import { MiddlePanel } from "../../layouts/GridPanels";
import { MainLayout } from "../../layouts/MainLayout";
import { LeftPanel } from "../../layouts/Panels";

export const EventsPage: React.FC = () => {
  return (
    <MainLayout leftPanel={<LeftPanel />}>
      <HeaderController title="Events" />
      <MiddlePanel
        stickyChildren={
          <AccountPageHeader icon={<Calendar />} title={"Events"} />
        }
      >
        <p>Hello world</p>
      </MiddlePanel>
    </MainLayout>
  );
};
