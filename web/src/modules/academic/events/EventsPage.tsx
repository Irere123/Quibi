import React from "react";
import { Calendar } from "../../../icons";
import { AccountPageHeader } from "../../../ui/AccountPageHeader";
import { HeaderController } from "../../display/HeaderController";
import { AccountLayout } from "../../layouts/AccountLayout";
import { AccountMainPanel } from "../../layouts/GridPanels";
import { LeftPanel } from "../LeftPanel";

export const EventsPage: React.FC = () => {
  return (
    <AccountLayout leftPanel={<LeftPanel />}>
      <HeaderController title="Events" />
      <AccountMainPanel
        stickyChildren={
          <AccountPageHeader icon={<Calendar />} title={"Events"} />
        }
      >
        <p>Hello world</p>
      </AccountMainPanel>
    </AccountLayout>
  );
};
