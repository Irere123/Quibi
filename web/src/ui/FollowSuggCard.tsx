import Link from "next/link";
import React from "react";
import { PersonAdd } from "../icons";
import { Button } from "./Button";
import { SingleUser } from "./UserAvatar";

interface FollowSuggCardProps {
  users: {
    id: number;
    displayName: string;
    username: string;
    avatarUrl: string;
  }[];
  onClick: () => void;
  onFollow: () => void;
}

interface UserSummaryCardProps {
  username: string;
  displayName: string;
  avatarUrl: string;
  onClick: () => void;
  onFollow: () => void;
}

const UserSummaryCard: React.FC<UserSummaryCardProps> = ({
  onClick,
  onFollow,
  avatarUrl,
  displayName,
  username,
}) => {
  return (
    <button className="flex w-full cursor-pointer gap-3">
      <div>
        <SingleUser src={avatarUrl} username={username} size="md" />
      </div>
      <div className="flex items-center gap-2 w-full">
        <div className="flex flex-col items-start flex-1" onClick={onClick}>
          <p className="text-primary-100">{displayName}</p>
          <p className="text-primary-300 text-sm">@{username}</p>
        </div>
        <Button onClick={onFollow} size="small" icon={<PersonAdd />}>
          Follow
        </Button>
      </div>
    </button>
  );
};

export const FollowSuggCard: React.FC<FollowSuggCardProps> = ({
  users,
  onClick,
  onFollow,
}) => {
  return (
    <div className="w-full rounded overflow-y-auto flex flex-col">
      <div className="px-4 py-2 bg-primary-800 border-b border-primary-600 flex justify-between items-center">
        <p className="text-primary-100 font-bold">People</p>
      </div>
      <div className="flex px-3 py-2 gap-2 flex-col bg-primary-800">
        {users.map((u, idx) => (
          <UserSummaryCard
            key={idx + u.id}
            avatarUrl={u.avatarUrl}
            displayName={u.displayName}
            username={u.username}
            onClick={onClick}
            onFollow={onFollow}
          />
        ))}
      </div>
      <Link href="/people">
        <a className="px-4 py-3 text-primary-100 font-bold bg-primary-700">
          Show more
        </a>
      </Link>
    </div>
  );
};
