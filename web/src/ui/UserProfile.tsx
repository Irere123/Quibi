import React from "react";
import { User } from "../modules/ws/types";
import { ProfileHeader } from "./ProfileHeader";

interface UserProfileProps {
  user: User;
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
