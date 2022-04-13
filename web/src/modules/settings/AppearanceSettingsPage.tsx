import React from "react";
import { NativeCheckbox } from "../../ui/NativeCheckbox";
import { SettingsWrapper } from "../../ui/SettingsWrapper";
import { HeaderController } from "../components/HeaderController";
import { SettingsLayout } from "../layouts/SettingsLayout";

interface Props {}

export const AppearanceSettingsPage: React.FC<Props> = () => {
  return (
    <SettingsLayout>
      <HeaderController title="Appearance Settings" />
      <SettingsWrapper>
        <p>Themes</p>
        <div className="space-y-3 mt-4">
          <NativeCheckbox
            subtitle="Rethink your life decisions"
            title="Diurnal(Light)"
            checked
          />
          <NativeCheckbox
            subtitle="Caring about your eyes since 2022"
            title="Nightly(Dark)"
          />
        </div>
      </SettingsWrapper>
    </SettingsLayout>
  );
};
