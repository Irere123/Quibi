import React from "react";
import { FullscreenIcon } from "../icons";
import { BoxedIcon } from "./BoxedIcon";
import { Button } from "./Button";
import { DurationTicker } from "./DurationTicker";

export interface MinimizedQuizCardProps {
  onFullscreenClick?: () => void;
  leaveLoading?: boolean;
  quiz: {
    name: string;
    peopleInside: string[];
    quizStartedAt: Date;
    myself: {
      leave(): void;
    };
  };
  children?: React.ReactChild;
}

export const MinimizedQuizCard: React.FC<MinimizedQuizCardProps> = ({
  quiz,
  leaveLoading,
  onFullscreenClick,
}) => {
  return (
    <div
      className="bg-primary-800 border border-accent rounded-lg p-4 gap-4 grid max-w-md w-full"
      data-testid="minimized-room-card"
    >
      <div className="gap-1 grid">
        <h4 className="text-primary-100 break-all overflow-hidden">
          {quiz.name}
        </h4>
        <div className="text-primary-300 overflow-ellipsis overflow-hidden w-auto">
          {quiz.peopleInside.join(", ")}
        </div>
        <div className="text-accent">
          <DurationTicker dt={quiz.quizStartedAt} />
        </div>
      </div>
      <div className="flex flex-row">
        <div className="grid grid-cols-3 gap-2">
          <BoxedIcon transition onClick={onFullscreenClick}>
            <FullscreenIcon />
          </BoxedIcon>
        </div>
        <Button
          transition
          color="primary-300"
          loading={leaveLoading}
          className="flex-grow ml-4"
          onClick={quiz.myself.leave}
        >
          Leave
        </Button>
      </div>
    </div>
  );
};
