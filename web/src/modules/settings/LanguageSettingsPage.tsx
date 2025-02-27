import React from "react";
import { useTranslation } from "react-i18next";
import { useTypeSafeTranslation } from "../../hooks/useTypeSafeTranslation";
import { BaseSettingsItem } from "../../ui/BaseSettingsItem";
import { NativeCheckbox } from "../../ui/NativeCheckbox";
import { SettingsWrapper } from "../../ui/SettingsWrapper";
import { HeaderController } from "../display/HeaderController";
import { SettingsLayout } from "../layouts/SettingsLayout";

interface Props {}

export const LanguageSettingsPage: React.FC<Props> = () => {
  const { t } = useTypeSafeTranslation();

  const languages = [
    { value: "en", label: "English", example: "Hello world" }, // English
    { value: "fr", label: "Français", example: "Cet platforme est cool" }, // French
    {
      value: "kiny",
      label: "Ikinyarwanda",
      example: "Murahoneza tubahaye ikaze",
    }, // Kinyarwanda
  ].sort((a, b) => a.label.localeCompare(b.label));

  const { i18n } = useTranslation();

  return (
    <SettingsLayout>
      <HeaderController title={t("pages.settings.language.title")} embed={{}} />
      <SettingsWrapper>
        <BaseSettingsItem>
          <p className="text-primary-100">
            {t("pages.settings.language.label")}
          </p>
          <div className="space-y-3 mt-3">
            {languages.map((e, i) => (
              <NativeCheckbox
                onClick={() => {
                  i18n.changeLanguage(e.value);
                }}
                key={e.value + i}
                checked={i18n.language === e.value}
                title={e.label}
                subtitle={e.example}
              />
            ))}
          </div>
        </BaseSettingsItem>
      </SettingsWrapper>
    </SettingsLayout>
  );
};
