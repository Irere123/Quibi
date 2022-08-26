import React from "react";
import { JoinQuizAndGetInfoResponse } from "@quibi/client";
import { useConn } from "../../hooks/useConn";
import { useScreenType } from "../../hooks/useScreenType";
import { useCurrentQuizIdStore } from "../../stores/useCurentQuizIdStore";
import { CenterLoader } from "../../ui/CenterLoader";
import { InfoText } from "../../ui/InfoText";
import { Spinner } from "../../ui/Spinner";
import { HeaderController } from "../display/HeaderController";
import { MiddlePanel } from "../layouts/GridPanels";
import { useQuizChatStore } from "./chat/useQuizChatStore";
import { QuizIconBarPanel } from "./QuizIconBarPanel";
import { QuizInfoPanel } from "./QuizInfoPanel";
import { QuizQuestionsPanel } from "./QuizQuestionsPanel";
import { useGetQuizByQueryParams } from "./useGetQuizByQueryParams";
import { UserPreviewModal } from "./UserPreviewModal";

interface QuizPageControllerProps {
  setQuizData?: React.Dispatch<
    React.SetStateAction<JoinQuizAndGetInfoResponse | undefined>
  >;
}

export const QuizPageController: React.FC<QuizPageControllerProps> = ({
  setQuizData,
}) => {
  const conn = useConn();
  const { currentQuizId } = useCurrentQuizIdStore();
  const { data, isLoading } = useGetQuizByQueryParams();

  const open = useQuizChatStore((s) => s.open);
  const screenType = useScreenType();

  if (!data) {
    return null;
  }

  if ("error" in data) {
    return <InfoText>{data.error}</InfoText>;
  }

  if (isLoading || !currentQuizId) {
    return (
      <>
        <MiddlePanel>
          <CenterLoader />
        </MiddlePanel>
      </>
    );
  }

  const quizCreator = data.users.find((x: any) => x.id === data.quiz.creatorId);
  if (setQuizData) setQuizData(data);

  return (
    <MiddlePanel
      stickyChildren={
        screenType !== "fullscreen" ? (
          <QuizInfoPanel
            names={quizCreator ? [quizCreator.username] : []}
            quizTitle={data.quiz.name}
            numPeopleInside={data.quiz.numPeopleInside}
          />
        ) : (
          ""
        )
      }
    >
      <UserPreviewModal {...data} />
      <HeaderController
        description={data.quiz.description}
        title={data.quiz.name}
      />
      <div className="flex flex-col h-full w-full">
        {screenType === "fullscreen" && open ? null : <QuizQuestionsPanel />}
        <div
          className={`sticky bottom-0 pb-5 bg-primary-900 ${
            (screenType === "fullscreen" || screenType === "1-cols") && open
              ? "flex-1"
              : ""
          }`}
        >
          <QuizIconBarPanel {...data} />
        </div>
      </div>
    </MiddlePanel>
  );
};
