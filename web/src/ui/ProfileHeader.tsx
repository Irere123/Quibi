import React, { ReactChild } from "react";
import { ProfileHeaderWrapper } from "./ProfileHeaderWrapper";
import { Button } from "./Button";
import { UserBadge } from "./UserBadge";
import { SingleUser } from "./UserAvatar/SingleUser";
import { CompassIcon, Friends } from "../icons";
import { MessageSquare } from "react-feather";

export interface ProfileHeaderProps {
  displayName: string;
  username: string;
  children?: ReactChild;
  pfp?: string;
  canDM?: boolean;
  isCurrentUser?: boolean;
  user: any;
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  displayName,
  username,
  user,
  children,
  canDM,
  isCurrentUser,
  pfp = "https://dogehouse.tv/favicon.ico",
}) => {
  return (
    // @TODO: Add the cover api (once it's implemented)}
    <ProfileHeaderWrapper
      coverUrl={user.bannerUrl || "https://source.unsplash.com/random"}
    >
      <div className="flex mr-4 ">
        <SingleUser
          isOnline={user.online}
          className="absolute flex-none -top-5.5 rounded-full shadow-outlineLg bg-primary-900"
          src={pfp}
        />
      </div>
      <div className="flex flex-col w-3/6 font-sans">
        <h4 className="text-primary-100 font-bold truncate">{displayName}</h4>
        <div className="flex flex-row items-center">
          <p
            className="text-primary-300 mr-2"
            data-testid="profile-info-username"
          >{`@${username}`}</p>
          {user.followsYou ? (
            <UserBadge color="grey" variant="primary-700">
              follows you
            </UserBadge>
          ) : (
            ""
          )}
        </div>
        <div className="mt-2">
          {user.botOwnerId ? (
            <UserBadge color="white" variant="primary">
              Bot
            </UserBadge>
          ) : (
            ""
          )}
          {children}
        </div>
      </div>

      <div className="w-3/6 ">
        <div className="flex flex-row justify-end content-end gap-2">
          {!isCurrentUser && (
            <Button
              size="small"
              color={user.iBlockedThem ? "primary-300" : "primary"}
            >
              {user.iBlockedThem ? "Unblock" : "Block"}
            </Button>
          )}
          {!isCurrentUser && (
            <Button
              size="small"
              color={user.youAreFollowing ? "primary-300" : "primary"}
              icon={user.youAreFollowing ? null : <Friends />}
            >
              {user.youAreFollowing ? <>Unfollow</> : <>Follow</>}
            </Button>
          )}
          {isCurrentUser ? (
            <Button size="small" icon={<CompassIcon />}>
              edit profile
            </Button>
          ) : (
            ""
          )}
          {canDM ? (
            <Button size="small" color="primary-300" icon={<MessageSquare />}>
              Send DM
            </Button>
          ) : (
            ""
          )}
        </div>
      </div>
    </ProfileHeaderWrapper>
  );
};
