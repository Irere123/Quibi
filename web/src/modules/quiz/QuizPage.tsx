import React, { useState } from "react";
import { JoinQuizAndGetInfoResponse, Quiz } from "@quibi/client";
import { useRouter } from "next/router";
import { defaultQueryFn } from "../../lib/defaultQueryFn";
import { isServer } from "../../lib/isServer";
import { PageComponent } from "../../types/PageComponent";
import { PageHeader } from "../../ui/mobile/MobileHeader";
import { WaitForWsAndAuth } from "../auth/WaitForWsAndAuth";
import { MainLayout } from "../layouts/MainLayout";
import { LeftPanel } from "../layouts/Panels";
import { TabletSidebar } from "../layouts/TabletSidebar";
import { QuizChatController } from "./QuizChatController";
import { QuizOpenGraphPreview } from "./QuizOpenGraphPreview";
import { QuizPageController } from "./QuizPageController";
import { UserPreviewModalProvider } from "./UserPreviewModalProvider";
import { useLeaveQuiz } from "../../hooks/useLeaveQuiz";
import { useConn } from "../../hooks/useConn";

interface QuizPageProps {
  quiz?: Quiz;
}

export const QuizPage: PageComponent<QuizPageProps> = ({ quiz }) => {
  const { query, back, push } = useRouter();
  const key = typeof query.id === "string" ? query.id : "";
  const { leaveQuiz } = useLeaveQuiz();
  const conn = useConn();
  const [quizData, setQuizData] = useState(
    undefined as JoinQuizAndGetInfoResponse | undefined
  );

  return (
    <QuizOpenGraphPreview quiz={quiz}>
      <UserPreviewModalProvider>
        <WaitForWsAndAuth>
          <MainLayout
            floatingQuizInfo={null}
            tabletSidebar={<TabletSidebar />}
            leftPanel={<LeftPanel />}
            rightPanel={<QuizChatController />}
            mobileHeader={
              <PageHeader
                title={
                  <>
                    <div className="text-center absolute flex flex-col left-1/2 top-1/2 transform translate-x-n1/2 translate-y-n1/2 w-3/5">
                      <span className="line-clamp-1">
                        {quizData?.quiz.name}
                      </span>
                      {quizData && (
                        <span
                          className={"text-sm text-center font-normal truncate"}
                        >
                          with{" "}
                          <span className={"font-bold truncate"}>
                            {
                              quizData?.users.find(
                                (x: any) => x.id === quizData?.quiz.creatorId
                              )?.username
                            }
                          </span>
                        </span>
                      )}
                    </div>
                    <button
                      className={
                        "absolute right-3 top-1/2 transform translate-y-n1/2 font-bold text-accent"
                      }
                      style={{ fontSize: "14px" }}
                      onClick={() => {
                        push("/dash");
                        leaveQuiz();
                      }}
                    >
                      Leave
                    </button>
                  </>
                }
                onBackClick={() => {
                  back();
                }}
              />
            }
          >
            <QuizPageController key={key} setQuizData={setQuizData} />
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
