import React from "react";
import { BaseUser } from "@quibi/client";
import { ProfileHeader } from "./ProfileHeader";

interface UserProfileProps {
  user: BaseUser;
  isCurrentUser?: boolean;
}

export const UserProfile: React.FC<UserProfileProps> = ({
  user,
  isCurrentUser,
}) => {
  return (
    <>
      <ProfileHeader
        user={user}
        pfp={user.avatarUrl}
        displayName={user.displayName}
        isCurrentUser={isCurrentUser}
        username={user.username}
      />
    </>
  );
};
