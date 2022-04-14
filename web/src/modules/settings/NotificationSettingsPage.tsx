import React from "react";
import { useTypeSafeTranslation } from "../../hooks/useTypeSafeTranslation";
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
        <p>{t("pages.settings.notifications.label")}</p>
        <div className="space-y-3 mt-4">
          <NativeCheckbox
            title="Assignment"
            subtitle="New assignment from your teacher or classmate"
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
      </SettingsWrapper>
    </SettingsLayout>
  );
};
