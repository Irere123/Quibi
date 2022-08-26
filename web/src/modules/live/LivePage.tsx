import React from "react";
import { useTypeSafeTranslation } from "../../hooks/useTypeSafeTranslation";
import { PageComponent } from "../../types/PageComponent";
import { WaitForWsAndAuth } from "../auth/WaitForWsAndAuth";
import { HeaderController } from "../display/HeaderController";
import { MainLayout } from "../layouts/MainLayout";
import { LeftPanel } from "../layouts/Panels";
import { RightPanel } from "./RightPanel";
import { WorksController } from "./WorksController";

interface LivePageProps {}

export const LivePage: PageComponent<LivePageProps> = () => {
  const { t } = useTypeSafeTranslation();

  return (
    <WaitForWsAndAuth>
      <MainLayout leftPanel={<LeftPanel />} rightPanel={<RightPanel />}>
        <HeaderController
          title={t("components.panels.right.explore")}
          embed={{}}
        />
        <WorksController />
      </MainLayout>
    </WaitForWsAndAuth>
  );
};

LivePage.ws = true;
