import React, { ReactElement, useEffect, useMemo, useState } from "react";
import { BubbleText } from "./BubbleText";
import { QuizCardHeading } from "./QuizCardHeading";

import { Tag } from "./Tag";
import { MultipleUsers } from "./Avatars";
import { differenceInMilliseconds, format, isPast, isToday } from "date-fns";
import { TimeIcon } from "../icons";

export interface QuizCardProps {
  icon?: ReactElement;
  title: string;
  subtitle: string;
  numPeopleInside: number;
  scheduledFor?: Date;
  avatars: string[];
  speakers?: string[];
  tags: string[];
  onClick?: () => void;
}

export function formatNumber(num: number): string {
  return Math.abs(num) > 999
    ? `${Math.sign(num) * Number((Math.abs(num) / 1000).toFixed(1))}K`
    : `${Math.sign(num) * Math.abs(num)}`;
}

function useScheduleRerender(scheduledFor?: Date) {
  const [, rerender] = useState(0);

  useEffect(() => {
    if (!scheduledFor) {
      return;
    }

    let done = false;
    const id = setTimeout(() => {
      done = true;
      rerender((x) => x + 1);
    }, differenceInMilliseconds(scheduledFor, new Date()) + 1000);

    return () => {
      if (!done) {
        clearTimeout(id);
      }
    };
  }, [scheduledFor]);
}

export const QuizCard: React.FC<QuizCardProps> = ({
  subtitle,
  title,
  avatars,
  speakers,
  tags,
  onClick,
  icon,
  numPeopleInside,
  scheduledFor,
}) => {
  useScheduleRerender(scheduledFor);

  let scheduledForLabel = "";

  if (scheduledFor) {
    if (isToday(scheduledFor)) {
      scheduledForLabel = format(scheduledFor, `K:mm a`);
    } else {
      scheduledForLabel = format(scheduledFor, `LLL d`);
    }
  }

  const quizLive = !scheduledFor || isPast(scheduledFor);
  return (
    <button
      onClick={onClick}
      className="flex flex-col w-full p-4 rounded-lg transition duration-200 ease-in-out bg-primary-800 hover:bg-primary-700"
    >
      <div className="flex justify-between w-full space-x-4">
        <QuizCardHeading
          icon={quizLive ? undefined : <TimeIcon />}
          text={title}
        />
        <div className="flex flex-shrink-0">
          <BubbleText live={quizLive}>
            {quizLive ? formatNumber(numPeopleInside) : scheduledForLabel}
          </BubbleText>
        </div>
      </div>
      <div className="w-full mt-2 flex">
        {avatars.length > 0 ? (
          <MultipleUsers className="mr-2" srcArray={avatars} />
        ) : null}
        <div className="text-left break-all truncate whitespace-pre-wrap line-clamp-2 text-primary-300">
          {subtitle}
        </div>
      </div>
      <div className="flex mt-4 space-x-2">
        {tags.map((tag, idx) => (
          <Tag key={idx}>{tag}</Tag>
        ))}
      </div>
    </button>
  );
};
