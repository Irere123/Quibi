import React from "react";
import { defaultQueryFn } from "../../lib/defaultQueryFn";
import { isServer } from "../../lib/isServer";
import { PageComponent } from "../../types/PageComponent";
import { WaitForWsAndAuth } from "../auth/WaitForWsAndAuth";
import { MainLayout } from "../layouts/MainLayout";
import { LeftPanel } from "../layouts/Panels";
import { Quiz } from "../ws";
import { QuizChatController } from "./QuizChatController";
import { QuizOpenGraphPreview } from "./QuizOpenGraphPreview";
import { QuizPageController } from "./QuizPageController";
import { UserPreviewModalProvider } from "./UserPreviewModalProvider";

interface QuizPageProps {
  quiz?: Quiz;
}

export const QuizPage: PageComponent<QuizPageProps> = ({ quiz }) => {
  return (
    <QuizOpenGraphPreview quiz={quiz}>
      <UserPreviewModalProvider>
        <WaitForWsAndAuth>
          <MainLayout
            leftPanel={<LeftPanel />}
            rightPanel={<QuizChatController />}
          >
            <QuizPageController />
          </MainLayout>
        </WaitForWsAndAuth>
      </UserPreviewModalProvider>
    </QuizOpenGraphPreview>
  );
};

QuizPage.ws = true;

// ssr
QuizPage.getInitialProps = async ({ query }) => {
  const key = typeof query.id === "string" ? query.id : "";
  let quiz = null;

  if (isServer && key) {
    try {
      const resp = await defaultQueryFn({ queryKey: `/quiz/${key}` });
      if ("quiz" in resp) {
        quiz = resp.quiz;
      }
    } catch {}
  }

  return { quiz };
};
