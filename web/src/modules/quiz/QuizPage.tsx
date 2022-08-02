import React from "react";
import { PageComponent } from "../../types/PageComponent";
import { WaitForWsAndAuth } from "../auth/WaitForWsAndAuth";
import { MainLayout } from "../layouts/MainLayout";
import { LeftPannel } from "../layouts/Panels";
import { QuizPageController } from "./QuizPageController";

interface QuizPageProps {}

export const QuizPage: PageComponent<QuizPageProps> = () => {
  return (
    <WaitForWsAndAuth>
      <MainLayout leftPanel={<LeftPannel />}>
        <QuizPageController />
      </MainLayout>
    </WaitForWsAndAuth>
  );
};

QuizPage.ws = true;
