import React from "react";
import { useTypeSafeTranslation } from "../../hooks/useTypeSafeTranslation";
import { useKeyMapStore } from "../../stores/useKeyMapStore";
import { BaseSettingsItem } from "../../ui/BaseSettingsItem";
import { KeybindCard } from "../../ui/KeybindCard";
import { SettingsWrapper } from "../../ui/SettingsWrapper";
import { HeaderController } from "../components/HeaderController";
import { SettingsLayout } from "../layouts/SettingsLayout";

interface Props {}

export const KeybindsSettingsPage: React.FC<Props> = () => {
  const {
    keyMap: { HOME, ACCOUNT, CHAT, SETTINGS },
  } = useKeyMapStore();
  const { t } = useTypeSafeTranslation();
  const keybinds = [
    { label: "home", value: HOME },
    { label: "chat", value: CHAT },
    { label: "settings", value: SETTINGS },
    { label: "account", value: ACCOUNT },
  ];

  return (
    <SettingsLayout>
      <HeaderController title={t("pages.settings.keybinds.title")} embed={{}} />
      <SettingsWrapper>
        <BaseSettingsItem>
          <p className="text-primary-200 font-bold">Default keybinds</p>

          <div className="space-y-3 mt-3">
            {keybinds.map((keybind, idx) => (
              <KeybindCard
                key={keybind.label + idx}
                command={keybind.label}
                keybind={keybind.value.toString()}
              />
            ))}
          </div>
        </BaseSettingsItem>
      </SettingsWrapper>
    </SettingsLayout>
  );
};
