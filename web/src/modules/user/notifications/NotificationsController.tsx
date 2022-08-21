import React from "react";
import { PageHeader } from "../../../ui/PageHeader";
import { MiddlePanel } from "../../layouts/GridPanels";

export const NotificationsController: React.FC = () => {
  return (
    <MiddlePanel stickyChildren={<PageHeader title={"Notifications"} />}>
      <div></div>
    </MiddlePanel>
  );
};
