import React from "react";
import { PageComponent } from "../../types/PageComponent";
import { HeaderController } from "../display/HeaderController";
import { AccountLayout } from "../layouts/AccountLayout";
import { AccountController } from "./AccountController";
import { LeftPanel } from "./LeftPanel";

interface AccountPageProps {}

export const AccountPage: PageComponent<AccountPageProps> = () => {
  return (
    <AccountLayout leftPanel={<LeftPanel />}>
      <HeaderController title="Account" />
      <AccountController />
    </AccountLayout>
  );
};

AccountPage.ws = true;
