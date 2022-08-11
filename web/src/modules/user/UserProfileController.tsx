import { useRouter } from "next/router";
import React from "react";
import { useMeQuery } from "../../hooks/useMeQuery";
import { useTypeSafeQuery } from "../../hooks/useTypeSafeQuery";
import avatar from "../../img/avatar.jpg";
import { InfoText } from "../../ui/InfoText";
import { UserProfile } from "../../ui/UserProfile";

export const UserProfileController: React.FC = () => {
  const { me } = useMeQuery();
  const { query } = useRouter();
  const username = query.username;

  const { data, isLoading } = useTypeSafeQuery("get_user_profile", {
    userIdOrUsername: username,
  });

  if (isLoading) {
    return <InfoText>Loading....</InfoText>;
  }

  if (!data?.user) {
    return <InfoText>User can not be found</InfoText>;
  }

  return (
    <>
      <UserProfile user={data?.user} isCurrentUser={me?.id === data.user.id} />
    </>
  );
};
