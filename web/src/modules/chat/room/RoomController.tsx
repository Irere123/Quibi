import React from "react";

import { HeaderController } from "../../display/HeaderController";
import { ChatLayout } from "../../layouts/ChatLayout";
import { RoomChat } from "./RoomChat";
import { LeftPanel } from "../LeftPanel";
import { MiddlePanel } from "../../layouts/GridPanels";
import { RoomChatRightPanel } from "./RoomChatRightPanel";
import { WaitForWsAndAuth } from "../../auth/WaitForWsAndAuth";
import { PageComponent } from "../../../types/PageComponent";

interface RoomControllerProps {}

export const RoomController: PageComponent<RoomControllerProps> = () => {
  return (
    <WaitForWsAndAuth>
      <ChatLayout leftPanel={<LeftPanel />} rightPanel={<RoomChatRightPanel />}>
        <HeaderController title="Group name" embed={{}} />
        <MiddlePanel>
          <RoomChat />
        </MiddlePanel>
      </ChatLayout>
    </WaitForWsAndAuth>
  );
};

RoomController.ws = true;
