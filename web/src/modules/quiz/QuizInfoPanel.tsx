import Link from "next/link";
import React from "react";
import { kFormatter } from "../../lib/kFormatter";
import { BubbleText } from "../../ui/BubbleText";

interface QuizInfoPanelProps {
  numPeopleInside: number;
  quizTitle: string;
  names: string[];
}

export const QuizInfoPanel: React.FC<QuizInfoPanelProps> = ({
  names,
  quizTitle,
  numPeopleInside,
}) => {
  return (
    <div className="flex flex-col p-4 bg-primary-800 rounded-t-lg border-b border-primary-600 w-full">
      <div className="flex">
        <button
          className={`flex text-xl text-primary-100 font-bold flex-1 truncate`}
        >
          {quizTitle}
        </button>
        <BubbleText>{kFormatter(numPeopleInside)}</BubbleText>
      </div>
      <div className={`flex text-primary-200 text-sm`}>
        <span style={{ marginRight: 4 }}>with</span>{" "}
        {names.map((username, i) => (
          <Link href={`/u/${username}`} key={i}>
            <a>
              <span
                className={`font-bold text-primary-100 hover:underline`}
                style={{ marginRight: 4 }}
              >
                {`${username}`}
                {i === names.length - 1 ? "" : `,`}
              </span>
            </a>
          </Link>
        ))}
      </div>
    </div>
  );
};
