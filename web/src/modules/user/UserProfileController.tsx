import React from "react";
import avatar from "../../img/avatar.jpg";
import { UserProfile } from "../../ui/UserProfile";

export const UserProfileController: React.FC = () => {
  return (
    <>
      <UserProfile
        user={{
          avatarUrl: avatar.src,
          bannerUrl: avatar.src,
          bio: "My name is ",
          displayName: "Irere Emmy",
          id: "2",
          online: true,
          username: "irere_emmy",
          followsYou: true,
          youAreFollowing: true,
        }}
        isCurrentUser={false}
      />
    </>
  );
};
