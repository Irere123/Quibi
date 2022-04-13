import React from "react";
import { SettingsWrapper } from "../../ui/SettingsWrapper";
import { HeaderController } from "../components/HeaderController";
import { SettingsLayout } from "../layouts/SettingsLayout";

export const AccountSettingspage: React.FC = () => {
  return (
    <SettingsLayout>
      <HeaderController title="Account Settings" embed={{}} />
      <SettingsWrapper>
        <h1 className={`pb-4 text-2xl`}>account</h1>
      </SettingsWrapper>
    </SettingsLayout>
  );
};
