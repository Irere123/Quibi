import React from "react";
import { useTypeSafeTranslation } from "../../hooks/useTypeSafeTranslation";
import { WorkPageHeader } from "../../ui/WorkPageHeader";
import { HeaderController } from "../display/HeaderController";
import { MiddlePanel } from "../layouts/GridPanels";
import { MainLayout } from "../layouts/MainLayout";
import { LeftPannel } from "../layouts/Panels";
import { RightPanel } from "./RightPanel";

export const WorksPage: React.FC = () => {
  const { t } = useTypeSafeTranslation();

  return (
    <MainLayout leftPanel={<LeftPannel />} rightPanel={<RightPanel />}>
      <HeaderController title={t("components.panels.right.works")} embed={{}} />
      <MiddlePanel stickyChildren={<WorkPageHeader title="For you" />}>
        <p>Hello world</p>
      </MiddlePanel>
    </MainLayout>
  );
};
