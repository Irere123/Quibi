import React from "react";
import { PushPin } from "../../icons";
import { AccountPageHeader } from "../../ui/AccountPageHeader";
import { AccountMainPanel } from "../layouts/GridPanels";

export const AccountController: React.FC = () => {
  return (
    <AccountMainPanel
      stickyChildren={
        <AccountPageHeader icon={<PushPin />} title={"Meetups"} />
      }
    >
      <h1>Hello world</h1>
    </AccountMainPanel>
  );
};
