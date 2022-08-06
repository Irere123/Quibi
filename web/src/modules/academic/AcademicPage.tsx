import React from "react";
import { useTypeSafeTranslation } from "../../hooks/useTypeSafeTranslation";
import { PageComponent } from "../../types/PageComponent";
import { WaitForWsAndAuth } from "../auth/WaitForWsAndAuth";
import { HeaderController } from "../display/HeaderController";
import { MainLayout } from "../layouts/MainLayout";
import { LeftPanel } from "../layouts/Panels";
import { AcademicController } from "./AcademicController";

interface AcademicPageProps {}

export const AcademicPage: PageComponent<AcademicPageProps> = () => {
  const { t } = useTypeSafeTranslation();

  return (
    <WaitForWsAndAuth>
      <HeaderController title={t("components.panels.right.acedemic")} />
      <MainLayout leftPanel={<LeftPanel />}>
        <AcademicController />
      </MainLayout>
    </WaitForWsAndAuth>
  );
};

AcademicPage.ws = true;
