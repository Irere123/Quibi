import React from "react";
import { useTranslation } from "react-i18next";
import { NativeCheckbox } from "../../ui/NativeCheckbox";
import { SettingsWrapper } from "../../ui/SettingsWrapper";
import { HeaderController } from "../components/HeaderController";
import { SettingsLayout } from "../layouts/SettingsLayout";

interface Props {}

export const LanguageSettingsPage: React.FC<Props> = () => {
  const languages = [
    { value: "en", label: "English", example: "Hello world" }, // English
    { value: "en-US", label: "English (US)", example: "Hello world" }, // English
    { value: "fr", label: "Français", example: "Comment ca va bien" }, // French
    {
      value: "kiny",
      label: "Ikinyarwanda",
      example: "Murahoneza tubahaye ikaze",
    }, // Kinyarwanda
  ].sort((a, b) => a.label.localeCompare(b.label));

  const { i18n } = useTranslation();

  return (
    <SettingsLayout>
      <HeaderController title="Languages" embed={{}} />
      <SettingsWrapper>
        <p>Languages</p>
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
      </SettingsWrapper>
    </SettingsLayout>
  );
};
