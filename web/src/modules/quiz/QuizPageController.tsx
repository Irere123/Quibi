import React from "react";
import { MiddlePanel } from "../layouts/GridPanels";
import { QuizIconBarPanel } from "./QuizIconBarPanel";
import { QuizInfoPanel } from "./QuizInfoPanel";
import { QuizQuestionsPanel } from "./QuizQuestionsPanel";

interface QuizPageControllerProps {}

export const QuizPageController: React.FC<QuizPageControllerProps> = () => {
  return (
    <MiddlePanel>
      <div className="flex flex-col h-full w-full">
        <QuizInfoPanel
          names={["irere", "reactjs"]}
          quizTitle={`Elon musk QandA`}
          numPeopleInside={20300}
        />
        <QuizQuestionsPanel />
        <div className={`sticky bottom-0 pb-7 bg-primary-900`}>
          <QuizIconBarPanel />
        </div>
      </div>
    </MiddlePanel>
  );
};
