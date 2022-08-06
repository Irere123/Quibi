import React, { ReactElement, useMemo } from "react";
import { kFormatter } from "../lib/kFormatter";
import { BubbleText } from "./BubbleText";
import { CardHeading } from "./CardHeading";

import { FormattedDate } from "./FormattedDate";
import { Tag } from "./Tag";
import { MultipleUsers, SingleUser } from "./Avatars";

export interface CardProps {
  icon?: ReactElement;
  title: string;
  subtitle: string;
  date?: number;
  avatar?: string;
  people?: number;
  live?: boolean;
  avatars?: string[];
  speakers?: string[];
  tags?: string[];
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({
  subtitle,
  title,
  avatar,
  date,
  avatars,
  speakers,
  tags,
  onClick,
  icon,
  live = false,
  people,
}) => {
  const dt = useMemo(() => new Date(date!), [date]);

  return (
    <button
      onClick={onClick}
      className="flex flex-col w-full p-4 rounded-lg transition duration-200 ease-in-out bg-primary-800 hover:bg-primary-700"
    >
      <div className="flex justify-between w-full space-x-4">
        <CardHeading text={title} icon={icon} />
        <div className="flex text-secondary-300 flex-shrink-0">
          {date ? (
            <FormattedDate date={dt} />
          ) : live ? (
            <BubbleText>{kFormatter(people!)}</BubbleText>
          ) : null}
        </div>
      </div>
      {live ? (
        <div className="w-full mt-2 flex">
          {avatars ? (
            <MultipleUsers className="mr-2" srcArray={avatars!} />
          ) : avatar ? (
            <SingleUser src={avatar} size="md" />
          ) : null}
          <div className="text-left break-all truncate whitespace-pre-wrap line-clamp-2 text-primary-300">
            {subtitle}
          </div>
        </div>
      ) : (
        <div className="w-full mt-2 flex flex-col">
          <div className="text-left break-all truncate whitespace-pre-wrap line-clamp-2 text-primary-300">
            {subtitle}
          </div>
          <div className="w-full flex items-center">
            <MultipleUsers srcArray={avatars!} />
            <div className="flex ml-1 text-primary-300 text-sm">
              {speakers?.join(", ")}
            </div>
          </div>
        </div>
      )}
      {tags ? (
        <div className="flex mt-4 space-x-2">
          {tags.map((tag, idx) => (
            <Tag key={idx + tag}>{tag}</Tag>
          ))}
        </div>
      ) : null}
    </button>
  );
};
