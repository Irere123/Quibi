import React, { useState } from "react";
import { useScreenType } from "../../hooks/useScreenType";
import { InfoText } from "../../ui/InfoText";
import { MiddlePanel } from "../layouts/GridPanels";
import { QuizIconBarPanel } from "./QuizIconBarPanel";
import { QuizInfoPanel } from "./QuizInfoPanel";
import { QuizQuestionsPanel } from "./QuizQuestionsPanel";
import { useGetQuizByQueryParams } from "./useGetQuizByQueryParams";

interface QuizPageControllerProps {}

export const QuizPageController: React.FC<QuizPageControllerProps> = () => {
  const { data, isLoading } = useGetQuizByQueryParams();

  if (!data) {
    return null;
  }

  if (isLoading) {
    return <InfoText>Loading...</InfoText>;
  }

  return (
    <MiddlePanel>
      <div className="flex flex-col h-full w-full">
        <QuizInfoPanel
          names={[
            data.quiz.peoplePreviewList
              .slice(0, 3)
              .map((x: any) => x.username)
              .join(", "),
          ]}
          quizTitle={data.quiz.name}
          numPeopleInside={data.quiz.numPeopleInside}
        />
        <QuizQuestionsPanel />
        <div className={`sticky bottom-0 pb-7 bg-primary-900`}>
          <QuizIconBarPanel />
        </div>
      </div>
    </MiddlePanel>
  );
};
