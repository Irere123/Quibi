import React from "react";
import { Tag } from "./Tag";
import { SingleUser } from "./Avatars";

export interface WorkCardProps {
  sender: {
    avatarUrl: string;
    username: string;
  };
  text: {
    title: string;
    subtitle: string;
    tag: string;
  };
  date: string;
  onActionClicked: () => void;
}

export const WorkCard: React.FC<WorkCardProps> = ({
  date,
  sender,
  text,
  onActionClicked,
}) => {
  return (
    <div
      className="flex flex-col gap-3 bg-primary-300 p-3 rounded cursor-pointer"
      onClick={onActionClicked}
    >
      <div className="flex flex-col">
        <div className="flex">
          <p className="flex flex-1">{text.title}</p>
          <Tag>{text.tag}</Tag>
        </div>
        <p className="text-sm">{text.subtitle}</p>
      </div>
      <div className="flex ">
        <div className="flex gap-3 items-center flex-1">
          <SingleUser
            size="xs"
            src={sender.avatarUrl}
            username={sender.username}
          />
          <p className="text-xs">{sender.username}</p>
        </div>
        <p className="text-sm">{date}</p>
      </div>
    </div>
  );
};
