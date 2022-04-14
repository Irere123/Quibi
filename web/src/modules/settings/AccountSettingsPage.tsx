import React from "react";
import { useTypeSafeTranslation } from "../../hooks/useTypeSafeTranslation";
import { SettingsWrapper } from "../../ui/SettingsWrapper";
import { HeaderController } from "../components/HeaderController";
import { SettingsLayout } from "../layouts/SettingsLayout";

export const AccountSettingspage: React.FC = () => {
  const { t } = useTypeSafeTranslation();

  return (
    <SettingsLayout>
      <HeaderController title={t("pages.settings.account.title")} embed={{}} />
      <SettingsWrapper>
        <h1 className={`pb-4 text-2xl`}>account</h1>
      </SettingsWrapper>
    </SettingsLayout>
  );
};
