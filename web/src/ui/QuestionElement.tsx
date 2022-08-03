import React from "react";
import { SingleUser } from "./Avatars";

interface QuestionElementProps {
  user: {
    username: string;
    avatarUrl: string;
  };
  question: string;
  choices?: string[];
}

export const QuestionElement: React.FC<QuestionElementProps> = ({
  question,
  user,
  choices,
}) => {
  return (
    <div className="flex gap-5 mt-3">
      <div>
        <SingleUser src={user.avatarUrl} size="sm" username={user.username} />
      </div>
      <div className="flex flex-col">
        <p className="text-primary-200">@{user.username}</p>
        <p className="text-primary-100 max-w-sm text-sm">{question}</p>
        {choices
          ? choices.map((choice, idx) => (
              <div className="text-primary-300 pl-2" key={idx}>
                <p>
                  <div
                    className={`inline-block mr-2 w-2 h-2 rounded-full bg-accent`}
                  ></div>
                  {choice}
                </p>
              </div>
            ))
          : null}
      </div>
    </div>
  );
};
