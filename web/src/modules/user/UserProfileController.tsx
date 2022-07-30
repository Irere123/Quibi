import { useRouter } from "next/router";
import React from "react";
import { useConn } from "../../hooks/useConn";
import { useTypeSafeQuery } from "../../hooks/useTypeSafeQuery";
import { isServer } from "../../lib/isServer";
import { InfoText } from "../../ui/InfoText";
import { UserProfile } from "../../ui/UserProfile";

export const UserProfileController: React.FC = () => {
  const conn = useConn();
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

  if (isLoading) {
    return <div>loading...</div>;
  }

  if (!data || ("error" in data && data.error.includes("could not find"))) {
    // @todo: make this better
    return <InfoText>The user could not be found</InfoText>;
  } else if ("error" in data) {
    // @todo: make this better
    return <InfoText>{data.error}</InfoText>;
  }

  return (
    <>
      <UserProfile user={data} isCurrentUser={conn.user.id === data.id} />
    </>
  );
};
