import { useRouter } from "next/router";
import React from "react";
import { useConn } from "../../hooks/useConn";
import { useTypeSafeQuery } from "../../hooks/useTypeSafeQuery";
import { isServer } from "../../lib/isServer";
import { InfoText } from "../../ui/InfoText";
import { UserProfile } from "../../ui/UserProfile";

export const UserProfileController: React.FC = () => {
  const { user } = useConn();
  const { query } = useRouter();

  const { data, isLoading } = useTypeSafeQuery(
    ["getUserProfile", query.username as string],
    {
      enabled:
        typeof query.username === "string" && !!query.username && !isServer,
      refetchOnMount: "always",
    },
    [query.username as string]
  );

  console.log(data);

  if (isLoading) {
    return <InfoText>Loading....</InfoText>;
  }

  if (!data || ("error" in data && data.error.includes("could not find"))) {
    return <InfoText>User can not be found</InfoText>;
  } else if ("error" in data && data.error.includes("blocked")) {
    return <InfoText>This user blocked you.</InfoText>;
  } else if ("error" in data) {
    return <InfoText>{data.error}</InfoText>;
  }

  return (
    <>
      <UserProfile user={data} isCurrentUser={user.id === data?.id} />
    </>
  );
};
