import React from "react";
import { kFormatter } from "../../../lib/kFormatter";
import { BubbleText } from "../../BubbleText";

export interface QuizSearchResultProps {
  quiz: {
    displayName: string;
    hosts: Array<{
      id: string;
      displayName: string;
      numFollowers: number;
    }>;
    userCount: number;
  };
  className?: string;
  onClick?: () => void;
}

export const QuizSearchResult: React.FC<QuizSearchResultProps> = ({
  quiz,
  className = "",
  onClick = () => undefined,
}) => {
  return (
    <div
      className={`flex cursor-pointer hover:bg-primary-700 px-4 py-3 w-full rounded-lg ${className}`}
      onClick={onClick}
    >
      <div className="flex flex-col w-full">
        <div className="flex w-full">
          <span className="text-primary-100 font-bold flex-1 items-center">
            {quiz.displayName}
          </span>
          <BubbleText live>{kFormatter(quiz.userCount)}</BubbleText>
        </div>
        <span className="text-primary-300">
          {quiz.hosts
            .slice(0, 3)
            .map((x) => x.displayName)
            .join(", ")}
        </span>
      </div>
    </div>
  );
};
