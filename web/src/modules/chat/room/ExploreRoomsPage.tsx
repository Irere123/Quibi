import { PageComponent } from "../../../types/PageComponent";
import { PageHeader } from "../../../ui/PageHeader";
import { WaitForWsAndAuth } from "../../auth/WaitForWsAndAuth";
import { HeaderController } from "../../display/HeaderController";
import { ChatLayout } from "../../layouts/ChatLayout";
import { MiddlePanel } from "../../layouts/GridPanels";
import { RightPanel } from "../../layouts/Panels";
import { LeftPanel } from "../LeftPanel";
import { RoomCard } from "./RoomCard";

interface Props {}

export const ExploreRoomsPage: PageComponent<Props> = () => {
  return (
    <WaitForWsAndAuth>
      <HeaderController title="Find Rooms" />
      <ChatLayout leftPanel={<LeftPanel />} rightPanel={<RightPanel />}>
        <MiddlePanel stickyChildren={<PageHeader title="Explore" />}>
          <div className="flex w-full justify-between flex-nowrap gap-4">
            <RoomCard
              description="this an awasome room to talk about things"
              roomName="Hello world"
              numMembers={122324}
              joinLoading={false}
              onJoin={() => console.log("hello")}
            />
            <RoomCard
              description="this an awasome room to talk about things"
              roomName="Science Talk"
              numMembers={438743}
              joinLoading={false}
              onJoin={() => console.log("hello")}
            />
          </div>
        </MiddlePanel>
      </ChatLayout>
    </WaitForWsAndAuth>
  );
};

ExploreRoomsPage.ws = true;
