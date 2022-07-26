import React from "react";
import { HeaderController } from "../../display/HeaderController";
import { ChatLayout } from "../../layouts/ChatLayout";
import { MiddlePanel } from "../../layouts/GridPanels";
import { LeftPanel } from "../LeftPanel";
import { DmChat } from "./DmChat";

type DmChatControllerProps = {};

export const DmChatController: React.FC<DmChatControllerProps> = () => {
  return (
    <ChatLayout leftPanel={<LeftPanel />}>
      <HeaderController title="Dm name" />
      <MiddlePanel>
        <DmChat />
      </MiddlePanel>
    </ChatLayout>
  );
};
