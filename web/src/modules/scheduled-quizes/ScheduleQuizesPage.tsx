import { PageComponent } from "../../types/PageComponent";
import { WaitForWsAndAuth } from "../auth/WaitForWsAndAuth";
import { HeaderController } from "../display/HeaderController";
import { RightPanel } from "../explore/RightPanel";
import { MainLayout } from "../layouts/MainLayout";
import { LeftPannel } from "../layouts/Panels";
import { ScheduledQuizList } from "./ScheduledQuizList";

interface ScheduledQuizesPageProps {}

export const ScheduledQuizesPage: PageComponent<
  ScheduledQuizesPageProps
> = () => {
  return (
    <WaitForWsAndAuth>
      <HeaderController title="Scheduled" />
      <MainLayout leftPanel={<LeftPannel />} rightPanel={<RightPanel />}>
        <ScheduledQuizList />
      </MainLayout>
    </WaitForWsAndAuth>
  );
};

ScheduledQuizesPage.ws = true;
