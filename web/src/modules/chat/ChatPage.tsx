import React from "react";
import { useTypeSafeTranslation } from "../../hooks/useTypeSafeTranslation";
import { HeaderController } from "../components/HeaderController";
import { MiddlePanel } from "../layouts/GridPanels";
import { MainLayout } from "../layouts/MainLayout";
import { RoomChatController } from "./room/RoomChatController";
import { LeftPanel } from "./LeftPanel";
import { RightPanel } from "./RightPanel";

export const ChatPage: React.FC = () => {
  const { t } = useTypeSafeTranslation();

  return (
    <MainLayout leftPanel={<LeftPanel />} rightPanel={<RightPanel />}>
      <HeaderController embed={{}} title={t("pages.chat.title")} />
      <MiddlePanel>
        <RoomChatController />
      </MiddlePanel>
    </MainLayout>
  );
};
