import React from "react";
import { useTypeSafeTranslation } from "../../hooks/useTypeSafeTranslation";
import { HeaderController } from "../components/HeaderController";
import { SettingsLayout } from "../layouts/SettingsLayout";

interface Props {}

export const KeybindsSettingsPage: React.FC<Props> = () => {
  const { t } = useTypeSafeTranslation();

  return (
    <SettingsLayout>
      <HeaderController title={t("pages.settings.keybinds.title")} embed={{}} />
      <h1>Keybinds</h1>
    </SettingsLayout>
  );
};
