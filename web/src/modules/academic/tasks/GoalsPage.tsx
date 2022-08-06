import React from "react";
import { Rocket } from "../../../icons";
import { AccountPageHeader } from "../../../ui/AccountPageHeader";
import { HeaderController } from "../../display/HeaderController";
import { AccountLayout } from "../../layouts/AccountLayout";
import { AccountMainPanel } from "../../layouts/GridPanels";
import { LeftPanel } from "../LeftPanel";

export const GoalsPage: React.FC = () => {
  return (
    <AccountLayout leftPanel={<LeftPanel />}>
      <HeaderController title="Goals" />
      <AccountMainPanel
        stickyChildren={<AccountPageHeader icon={<Rocket />} title={"Goals"} />}
      >
        <p>Hello world</p>
      </AccountMainPanel>
    </AccountLayout>
  );
};
