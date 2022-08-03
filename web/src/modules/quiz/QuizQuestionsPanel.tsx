import React from "react";
import avatar from "../../img/avatar.jpg";
import { QuestionElement } from "../../ui/QuestionElement";

interface QuizQuestionsPanelProps {}

export const QuizQuestionsPanel: React.FC<QuizQuestionsPanelProps> = () => {
  return (
    <div className="flex flex-col gap-3 flex-1 px-5 pt-2 bg-primary-800">
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
  );
};
