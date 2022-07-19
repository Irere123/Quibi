import { useRouter } from "next/router";
import React from "react";
import { useTypeSafeTranslation } from "../../hooks/useTypeSafeTranslation";
import { FeedHeader } from "../../ui/FeedHeader";
import { HeaderController } from "../components/HeaderController";
import { MiddlePanel } from "../layouts/GridPanels";
import { MainLayout } from "../layouts/MainLayout";
import { LeftPannel, RightPanel } from "../layouts/Panels";
import { WorksController } from "./WorksController";

export const WorksPage: React.FC = () => {
  const { push } = useRouter();
  const { t } = useTypeSafeTranslation();

  return (
    <MainLayout leftPanel={<LeftPannel />} rightPanel={<RightPanel />}>
      <HeaderController title={t("components.panels.right.works")} embed={{}} />
      <MiddlePanel
        stickyChildren={
          <FeedHeader
            title="Works"
            actionTitle="Create Quiz"
            onActionClicked={() => {
              push("/create-quiz");
            }}
          />
        }
      >
        <WorksController />
      </MiddlePanel>
    </MainLayout>
  );
};
