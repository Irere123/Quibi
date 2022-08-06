import React from "react";
import { Link2 } from "react-feather";
import { Calendar } from "../../icons";
import { SingleUser } from "../../ui/Avatars";
import { BoxedIcon } from "../../ui/BoxedIcon";

interface ScheduledQuizCardProps {
  info: {
    title: string;
    description: string;
    creator: {
      username: string;
      avatarUrl: string;
    };
  };
}

export const ScheduledQuizCard: React.FC<ScheduledQuizCardProps> = ({
  info,
}) => {
  return (
    <div className="p-4 w-full text-base bg-primary-800 rounded flex flex-col text-primary-100">
      <div className="flex justify-between">
        <div className="flex flex-1 font-bold text-ellipsis overflow-hidden break-all mb-4">
          {info.title}
        </div>
        <div className="flex gap-2">
          <SingleUser src={info.creator.avatarUrl} size="sm" isOnline={true} />
          <BoxedIcon>
            <Calendar />
          </BoxedIcon>
          <BoxedIcon>
            <Link2 />
          </BoxedIcon>
        </div>
      </div>
      <p>{info.description}</p>
    </div>
  );
};
