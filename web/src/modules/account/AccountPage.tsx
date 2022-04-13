import React from "react";
import { HeaderController } from "../components/HeaderController";
import { AccountLayout } from "./AccountLayout";

export const AccountPage: React.FC = () => {
  return (
    <>
      <HeaderController title="Account" embed={{}} />
      <AccountLayout>
        <h1>Hello profile</h1>
      </AccountLayout>
    </>
  );
};
