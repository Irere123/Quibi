import { PageComponent } from "../../../types/PageComponent";
import { WaitForWsAndAuth } from "../../auth/WaitForWsAndAuth";
import { ChatLayout } from "../../layouts/ChatLayout";
import { LeftPanel } from "../LeftPanel";
import { RoomController } from "./RoomController";
import { RoomRightPanel } from "./RoomRightPanel";

interface RoomPageProps {}

export const RoomPage: PageComponent<RoomPageProps> = () => {
  return (
    <WaitForWsAndAuth>
      <ChatLayout leftPanel={<LeftPanel />} rightPanel={<RoomRightPanel />}>
        <RoomController />
      </ChatLayout>
    </WaitForWsAndAuth>
  );
};

RoomPage.ws = true;
