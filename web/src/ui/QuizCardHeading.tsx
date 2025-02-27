import React, { ReactElement } from "react";
import { truncate } from "../lib/truncate";

export interface QuizCardHeadingProps {
  icon?: ReactElement;
  text: string;
}

export const QuizCardHeading: React.FC<QuizCardHeadingProps> = ({
  text,
  icon,
}) => {
  return (
    <div className="flex text-primary-100 font-bold leading-5 truncate w-full">
      {icon ? <span className="mr-2 align-middle">{icon}</span> : null}
      <span className="inline truncate">{text}</span>
    </div>
  );
};
