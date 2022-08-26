import React from "react";
import { kFormatter } from "../lib/kFormatter";
import { SingleUser } from "./Avatars";
import { Tag } from "./Tag";

export interface ArticleCardProps {
  user: {
    avatarUrl: string;
    displayName: string;
    online: boolean;
  };
  summary: string;
  schoolName: string;
  tags: string[];
  date: string;
  onClick: () => void;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({
  user,
  date,
  schoolName,
  summary,
  tags,
  onClick,
}) => {
  return (
    <div
      className="flex flex-col w-full bg-primary-800 p-3 rounded transition duration-200 ease-in-out hover:bg-primary-700"
      onClick={onClick}
    >
      <div className="flex gap-2 text-primary-100">
        <SingleUser src={user.avatarUrl} isOnline={user.online} size="sm" />
        <div>
          <p>{user.displayName}</p>
          <p className="text-primary-200 text-sm italic">{date}</p>
        </div>
      </div>
      <div className="p-2">
        <p className="text-primary-300">{summary}</p>
        <div className="flex gap-2">
          {tags.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </div>
      </div>
      <div className="flex gap-3">
        <p className="text-primary-200 text-sm">
          written in{" "}
          <span className="text-primary-100 underline text-base">
            {schoolName}
          </span>
        </p>
      </div>
    </div>
  );
};
