import React from "react";
import { HeaderController } from "../display/HeaderController";
import { AccountLayout } from "../layouts/AccountLayout";
import { AccountController } from "./AccountController";
import { LeftPanel } from "./LeftPanel";

export const AccountPage: React.FC = () => {
  return (
    <AccountLayout leftPanel={<LeftPanel />}>
      <HeaderController title="Account" />
      <AccountController />
    </AccountLayout>
  );
};
