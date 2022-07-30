import React from "react";
import { useTypeSafeTranslation } from "../../hooks/useTypeSafeTranslation";
import { PageComponent } from "../../types/PageComponent";
import { WaitForWsAndAuth } from "../auth/WaitForWsAndAuth";
import { HeaderController } from "../display/HeaderController";
import { MainLayout } from "../layouts/MainLayout";
import { LeftPannel } from "../layouts/Panels";
import { RightPanel } from "./RightPanel";
import { WorksController } from "./WorksController";

interface WorksPageProps {}

export const WorksPage: PageComponent<WorksPageProps> = () => {
  const { t } = useTypeSafeTranslation();

  return (
    <WaitForWsAndAuth>
      <MainLayout leftPanel={<LeftPannel />} rightPanel={<RightPanel />}>
        <HeaderController
          title={t("components.panels.right.works")}
          embed={{}}
        />
        <WorksController />
      </MainLayout>
    </WaitForWsAndAuth>
  );
};

WorksPage.ws = true;
