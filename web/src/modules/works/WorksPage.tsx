import React from "react";
import { useTypeSafeTranslation } from "../../hooks/useTypeSafeTranslation";
import { HeaderController } from "../display/HeaderController";
import { MiddlePanel } from "../layouts/GridPanels";
import { MainLayout } from "../layouts/MainLayout";
import { LeftPannel, RightPanel } from "../layouts/Panels";

export const WorksPage: React.FC = () => {
  const { t } = useTypeSafeTranslation();

  return (
    <MainLayout leftPanel={<LeftPannel />} rightPanel={<RightPanel />}>
      <HeaderController title={t("components.panels.right.works")} embed={{}} />
      <MiddlePanel
        stickyChildren={
          <div>
            <p>Hello world</p>
          </div>
        }
      >
        <p>Hello world</p>
      </MiddlePanel>
    </MainLayout>
  );
};
