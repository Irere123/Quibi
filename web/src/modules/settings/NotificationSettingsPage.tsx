import React from "react";
import { useTypeSafeTranslation } from "../../hooks/useTypeSafeTranslation";
import { BaseSettingsItem } from "../../ui/BaseSettingsItem";
import { NativeCheckbox } from "../../ui/NativeCheckbox";
import { SettingsWrapper } from "../../ui/SettingsWrapper";
import { HeaderController } from "../components/HeaderController";
import { SettingsLayout } from "../layouts/SettingsLayout";

export const NotificationSettingsPage: React.FC = () => {
  const { t } = useTypeSafeTranslation();

  return (
    <SettingsLayout>
      <HeaderController title={t("pages.settings.notifications.title")} />
      <SettingsWrapper>
        <BaseSettingsItem>
          <p className="text-primary-200">
            {t("pages.settings.notifications.label")}
          </p>
          <div className="space-y-3 mt-4">
            <NativeCheckbox
              title="Point of View"
              subtitle="New point of view from your friends and other people"
            />
            <NativeCheckbox
              title="Quiz/Test"
              subtitle="New test/quiz from your friends or teacher"
            />
            <NativeCheckbox
              title="Chat Messages"
              subtitle="Messages from your friends and groups"
            />
            <NativeCheckbox
              title="Upcoming Events"
              subtitle="When a person you follow creates an event"
            />
            <NativeCheckbox
              title="Marketing"
              subtitle="Marketing messages from Quibi"
            />
          </div>
        </BaseSettingsItem>
      </SettingsWrapper>
    </SettingsLayout>
  );
};
