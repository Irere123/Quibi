import React from "react";
import { PageComponent } from "../../../types/PageComponent";
import { WaitForWsAndAuth } from "../../auth/WaitForWsAndAuth";
import { HeaderController } from "../../display/HeaderController";
import { ChatLayout } from "../../layouts/ChatLayout";
import { MiddlePanel } from "../../layouts/GridPanels";
import { LeftPanel } from "../LeftPanel";
import { RoomForum } from "./RoomForum";
import { RoomForumRightPanel } from "./RoomForumRightPanel";

interface ForumPageProps {}

export const ForumPage: PageComponent<ForumPageProps> = () => {
  return (
    <WaitForWsAndAuth>
      <HeaderController />
      <ChatLayout
        leftPanel={<LeftPanel />}
        rightPanel={<RoomForumRightPanel />}
      >
        <MiddlePanel>
          <RoomForum />
        </MiddlePanel>
      </ChatLayout>
    </WaitForWsAndAuth>
  );
};

ForumPage.ws = true;
