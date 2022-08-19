import React from "react";
import avatar from "../../img/avatar2.jpg";
import { PlusIcon } from "../../icons";
import { SingleUser } from "../../ui/Avatars";
import { useTypeSafeQuery } from "../../hooks/useTypeSafeQuery";
import { User } from "../ws";
import { ApiPreloadLink } from "../../shared-components/ApiPreloadLink";

export interface MyPeopleOnlineProps {}

export const MyPeopleOnline: React.FC<MyPeopleOnlineProps> = () => {
  let limit = 7;
  const { data, isLoading } = useTypeSafeQuery(
    ["getMyFollowing", limit],
    {
      refetchOnMount: "always",
    },
    [limit]
  );

  if (!isLoading && !data?.users.length) {
    return null;
  }

  if (isLoading) {
    return null;
  }

  return (
    <>
      <div className="flex gap-2">
        <div
          className={`bg-gradient-to-r from-secondary-300 to-secondary-200 flex justify-center shadow-md shadow-primary-300 items-center cursor-pointer bg-secondary-300 w-6.5 h-6.5 rounded-full`}
        >
          <PlusIcon />
        </div>

        {data?.users.map((u: User) => (
          <ApiPreloadLink
            route="profile"
            data={{ username: u.username }}
            key={u.id}
          >
            <SingleUser src={u.avatarUrl} isOnline={u.online} size="md" />
          </ApiPreloadLink>
        ))}
      </div>
    </>
  );
};
