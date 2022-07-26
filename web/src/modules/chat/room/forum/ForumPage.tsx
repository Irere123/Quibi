import React from "react";
import { ChatLayout } from "../../../layouts/ChatLayout";
import { MiddlePanel } from "../../../layouts/GridPanels";
import { LeftPanel } from "../../LeftPanel";
import { RoomForum } from "./RoomForum";
import { RoomForumRightPanel } from "./RoomForumRightPanel";

export const ForumPage: React.FC = () => {
  return (
    <ChatLayout leftPanel={<LeftPanel />} rightPanel={<RoomForumRightPanel />}>
      <MiddlePanel>
        <RoomForum />
      </MiddlePanel>
    </ChatLayout>
  );
};
