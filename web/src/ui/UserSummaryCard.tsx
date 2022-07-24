import React from "react";
import { kFormatter } from "../lib/kFormatter";
import { SingleUser } from "./UserAvatar";
import { UserBadge } from "./UserBadge";

export type badge = {
  color: "white" | "grey";
  content: React.ReactNode;
  variant: "primary" | "secondary" | "primary-700";
};

export interface UserSummaryCardProps {
  onClick: () => void;
  id: string;
  displayName: string;
  username: string;
  numFollowers: number;
  numFollowing: number;
  isOnline: boolean;
  avatarUrl: string;
  badges: badge[];
  bio?: string;
  website?: string;
}

interface BadgesProps {
  badges: badge[];
}

interface WebsiteProps {
  website: string;
}

export const Badges: React.FC<BadgesProps> = ({ badges }) => {
  return (
    <div className="flex mt-2">
      {badges.map(({ content, variant, color }, i) => (
        <span className="mr-1" key={i}>
          <UserBadge variant={variant} color={color}>
            {content}
          </UserBadge>
        </span>
      ))}
    </div>
  );
};

const regex = /(^\w+:|^)\/\//;

export const Website: React.FC<WebsiteProps> = ({ website }) => {
  return (
    <a
      className="text-accent mt-3 font-bold"
      href={website}
      target="_blank"
      rel="noreferrer"
    >
      {website.replace(regex, "")}
    </a>
  );
};

export const UserSummaryCard: React.FC<UserSummaryCardProps> = ({
  onClick,
  displayName,
  username,
  badges,
  numFollowers,
  numFollowing,
  bio,
  website,
  isOnline,
  avatarUrl,
}) => {
  return (
    <div className="flex flex-col rounded-lg bg-primary-800 p-4 w-full">
      <button className="flex" onClick={onClick}>
        <div className="flex">
          <SingleUser size="default" isOnline={isOnline} src={avatarUrl} />
        </div>
        <div className="flex mt-2">
          <div className="flex flex-col ml-3">
            <span className="text-primary-100 font-bold overflow-hidden break-all text-left">
              {displayName}
            </span>
            <span className="text-primary-300 text-left break-all">
              @{username}
            </span>
            <Badges badges={badges} />
          </div>
        </div>
      </button>
      <div className="flex mt-3">
        <div className="flex">
          <span className="text-primary-100 font-bold">
            {kFormatter(numFollowers)}
          </span>
          <span className="text-primary-300 ml-1.5 lowercase">Followers</span>
        </div>
        <div className="flex ml-4">
          <span className="text-primary-100 font-bold">
            {kFormatter(numFollowing)}
          </span>
          <span className="text-primary-300 ml-1.5 lowercase">Following</span>
        </div>
      </div>
      <div
        data-testid="current-user:bio"
        className="flex text-primary-300 mt-3 break-words text-left"
      >
        {bio}
      </div>
      {website && <Website website={website} />}
    </div>
  );
};
