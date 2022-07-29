import React from "react";
import { useTypeSafeTranslation } from "../../hooks/useTypeSafeTranslation";
import { WaitForWsAndAuth } from "../auth/WaitForWsAndAuth";
import { HeaderController } from "../display/HeaderController";
import { MainLayout } from "../layouts/MainLayout";
import { LeftPannel } from "../layouts/Panels";
import { RightPanel } from "./RightPanel";
import { WorksController } from "./WorksController";

export const WorksPage: React.FC = () => {
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
