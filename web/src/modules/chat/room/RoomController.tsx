import React from "react";

import { HeaderController } from "../../display/HeaderController";
import { ChatLayout } from "../../layouts/ChatLayout";
import { RoomChat } from "./RoomChat";
import { RoomChatRightPanel } from "./RoomChatRightPanel";
import { LeftPanel } from "./LeftPanel";
import { MiddlePanel } from "../../layouts/GridPanels";
import { RoomForumRightPanel } from "./RoomForumRightPanel";
import { RoomForum } from "./RoomForum";

export const RoomController: React.FC = () => {
  let rightPanel = null;
  let middle = null;

  const isGroup = true;

  if (isGroup) {
    rightPanel = <RoomChatRightPanel />;
    middle = <RoomChat />;
  } else {
    rightPanel = <RoomForumRightPanel />;
    middle = <RoomForum />;
  }
  return (
    <ChatLayout leftPanel={<LeftPanel />} rightPanel={rightPanel}>
      <HeaderController title="Group name" embed={{}} />
      <MiddlePanel>{middle}</MiddlePanel>
    </ChatLayout>
  );
};
