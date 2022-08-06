import React from "react";
import avatar from "../../img/avatar2.jpg";
import { PlusIcon } from "../../icons";
import { SingleUser } from "../../ui/Avatars";
import { useTypeSafeQuery } from "../../hooks/useTypeSafeQuery";
import { useConn } from "../../hooks/useConn";
import { ApiPreloadLink } from "../../shared-components/ApiPreloadLink";

export interface MyPeopleOnlineProps {}

export const MyPeopleOnline: React.FC<MyPeopleOnlineProps> = ({}) => {
  const conn = useConn();
  const { data } = useTypeSafeQuery(
    "getUsersOnline",
    { refetchOnMount: "always" },
    [conn.user.id]
  );
  const hasFriendsOnline = data?.users.length > 0;

  return (
    <>
      {hasFriendsOnline && (
        <div className="flex gap-3">
          <div
            className={`bg-gradient-to-r from-secondary-300 to-secondary-200 flex justify-center shadow-md shadow-primary-300 items-center cursor-pointer bg-secondary-300 w-12 h-12 rounded-full`}
          >
            <PlusIcon />
          </div>
          {data.users.map((u: any) => (
            <div className="flex gap-3" key={u.id}>
              <ApiPreloadLink route="profile" data={{ username: u.username }}>
                <SingleUser
                  size="md"
                  src={u.avatarUrl}
                  username={u.username}
                  isOnline={u.online}
                />
              </ApiPreloadLink>
            </div>
          ))}
        </div>
      )}
    </>
  );
};
