import React from "react";
import { defaultQueryFn } from "../../lib/defaultQueryFn";
import { isServer } from "../../lib/isServer";
import { PageComponent } from "../../types/PageComponent";
import { WaitForWsAndAuth } from "../auth/WaitForWsAndAuth";
import { MainLayout } from "../layouts/MainLayout";
import { LeftPannel } from "../layouts/Panels";
import { QuizChatController } from "./QuizChatController";
import { QuizOpenGraphPreview } from "./QuizOpenGraphPreview";
import { QuizPageController } from "./QuizPageController";

interface QuizPageProps {}

export const QuizPage: PageComponent<QuizPageProps> = () => {
  return (
    <QuizOpenGraphPreview quiz={undefined}>
      <WaitForWsAndAuth>
        <MainLayout
          leftPanel={<LeftPannel />}
          rightPanel={<QuizChatController />}
        >
          <QuizPageController />
        </MainLayout>
      </WaitForWsAndAuth>
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
        quiz = resp.room;
      }
    } catch {}
  }

  return { quiz };
};
