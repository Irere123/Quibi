import React from "react";
import { FeedCardHeading } from "./FeedCardHeading";
import { MultipleUsers, SingleUser } from "./UserAvatar";

export interface FeedCardProps {
  title: string;
  subtitle: string;
  date?: string;
  avatar?: string;
  avatars?: string[];
  onClick?: () => void;
}

export const FeedCard: React.FC<FeedCardProps> = ({
  subtitle,
  title,
  avatar,
  date,
  avatars,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className="flex flex-col w-full p-4 rounded transition duration-200 ease-in-out border-2 border-primary-400"
    >
      <div className="flex justify-between w-full space-x-4">
        <FeedCardHeading text={title} />
        <div className="flex flex-shrink-0">
          <span>{date}</span>
        </div>
      </div>
      <div className="w-full mt-2 flex">
        {avatars ? (
          <MultipleUsers className="mr-2" srcArray={avatars!} />
        ) : avatar ? (
          <SingleUser src={avatar} />
        ) : null}
        <div className="text-left break-all truncate whitespace-pre-wrap line-clamp-2 text-black">
          {subtitle}
        </div>
      </div>
    </button>
  );
};
