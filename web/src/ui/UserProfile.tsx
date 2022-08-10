import React from "react";
import { ProfileHeader } from "./ProfileHeader";

interface UserProfileProps {
  user: {
    username: string;
    online: boolean;
    id: string;
    bio: string;
    displayName: string;
    avatarUrl: string;
    bannerUrl: string;
    inserted_at: string;
  };
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
