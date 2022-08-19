import React from "react";
import { useScreenType } from "../../hooks/useScreenType";
import avatar from "../../img/avatar.jpg";
import { QuestionElement } from "../../ui/QuestionElement";

interface QuizQuestionsPanelProps {}

export const QuizQuestionsPanel: React.FC<QuizQuestionsPanelProps> = () => {
  const screenType = useScreenType();

  return (
    <div
      className={`flex pt-4 px-4 flex-1 ${
        screenType !== "fullscreen" ? "bg-primary-800" : "bg-primary-900"
      }`}
    >
      <div className="flex flex-col">
        <QuestionElement
          user={{ avatarUrl: avatar.src, username: "irere" }}
          question={`Elon Reeve Musk FRS is a business magnate
        and investor. He is the founder, CEO, and 
        Chief Engineer at Space`}
        />
        <QuestionElement
          user={{ avatarUrl: avatar.src, username: "irere" }}
          question={"how to ride a bicycle"}
          choices={["Hop on", "Just ride"]}
        />
      </div>
    </div>
  );
};
