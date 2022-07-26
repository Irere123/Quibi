import React, { ReactElement, useMemo } from "react";
import { FeedCardHeading } from "./FeedCardHeading";
import { FormattedDate } from "./FormattedDate";
import { MultipleUsers } from "./UserAvatar";

export interface FeedCardProps {
  headIcon?: ReactElement;
  title: string;
  subtitle: string;
  date?: number;
  avatars?: string[];
  onClick?: () => void;
}

export const FeedCard: React.FC<FeedCardProps> = ({
  subtitle,
  title,
  date,
  avatars,
  onClick,
  headIcon,
}) => {
  const dt = useMemo(() => new Date(date!), [date]);

  return (
    <button
      onClick={onClick}
      className="flex flex-col w-full p-4 rounded transition duration-200 ease-in-out bg-primary-800 hover:bg-primary-700"
    >
      <div className="flex justify-between w-full space-x-4">
        <FeedCardHeading
          text={title}
          content={
            avatars ? (
              <MultipleUsers className="mr-2" srcArray={avatars!} />
            ) : null
          }
          icon={headIcon}
        />
        <div className="flex text-secondary-300 flex-shrink-0">
          <FormattedDate date={dt} />
        </div>
      </div>
      <div className="w-full mt-2 flex flex-col">
        <div className="text-left break-all truncate whitespace-pre-wrap line-clamp-2 text-primary-300 mb-2">
          {subtitle}
        </div>
      </div>
    </button>
  );
};
