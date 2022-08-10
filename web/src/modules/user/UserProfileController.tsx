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
          bio: "Hello world",
          displayName: "Irere emmy",
          id: "2332kjdsh327812saiusa9012",
          online: true,
          username: "irere emmy",
          inserted_at: new Date().toISOString(),
        }}
        isCurrentUser={true}
      />
    </>
  );
};
