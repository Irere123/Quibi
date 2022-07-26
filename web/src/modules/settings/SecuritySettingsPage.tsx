import React from "react";
import { useTypeSafeTranslation } from "../../hooks/useTypeSafeTranslation";
import { BaseSettingsItem } from "../../ui/BaseSettingsItem";
import { SettingsWrapper } from "../../ui/SettingsWrapper";
import { HeaderController } from "../display/HeaderController";
import { SettingsLayout } from "../layouts/SettingsLayout";

export const SecuritySettingsPage: React.FC = () => {
  const { t } = useTypeSafeTranslation();

  return (
    <SettingsLayout>
      <HeaderController title={t("pages.settings.security.title")} embed={{}} />
      <SettingsWrapper>
        <BaseSettingsItem className="flex flex-col gap-5">
          <p>Hellko world</p>
        </BaseSettingsItem>
      </SettingsWrapper>
    </SettingsLayout>
  );
};
