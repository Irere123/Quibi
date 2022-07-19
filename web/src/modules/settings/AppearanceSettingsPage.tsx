import React from "react";
import { useTypeSafeTranslation } from "../../hooks/useTypeSafeTranslation";
import { BaseSettingsItem } from "../../ui/BaseSettingsItem";
import { NativeCheckbox } from "../../ui/NativeCheckbox";
import { SettingsWrapper } from "../../ui/SettingsWrapper";
import { HeaderController } from "../components/HeaderController";
import { SettingsLayout } from "../layouts/SettingsLayout";

interface Props {}

export const AppearanceSettingsPage: React.FC<Props> = () => {
  const { t } = useTypeSafeTranslation();

  return (
    <SettingsLayout>
      <HeaderController title={t("pages.settings.appearance.title")} />
      <SettingsWrapper>
        <BaseSettingsItem>
          <p className="text-primary-200">Themes</p>
          <div className="space-y-3 mt-4">
            <NativeCheckbox
              subtitle="Caring about your eyes since 2022"
              title="Nightly(Dark)"
              checked
            />
            <NativeCheckbox
              subtitle="Rethink your life decisions"
              title="Diurnal(Cooming soon)"
              disabled
            />
          </div>
        </BaseSettingsItem>
      </SettingsWrapper>
    </SettingsLayout>
  );
};
