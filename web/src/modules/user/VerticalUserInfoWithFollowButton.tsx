import React from "react";
import { useConn } from "../../hooks/useConn";
import { useTypeSafeMutation } from "../../hooks/useTypeSafeMutation";
import { useTypeSafeTranslation } from "../../hooks/useTypeSafeTranslation";
import { useTypeSafeUpdateQuery } from "../../hooks/useTypeSafeUpdateQuery";
import { Friends } from "../../icons";
import { Button } from "../../ui/Button";
import { VerticalUserInfo } from "../../ui/VerticalUserInfo";
import { User } from "../ws";

interface VerticalUserInfoControllerProps {
  user: User;
  idOrUsernameUsedForQuery: string;
}

export const VerticalUserInfoWithFollowButton: React.FC<
  VerticalUserInfoControllerProps
> = ({ idOrUsernameUsedForQuery, user }) => {
  const { mutateAsync, isLoading: followLoading } =
    useTypeSafeMutation("follow");
  const conn = useConn();
  const updater = useTypeSafeUpdateQuery();
  const { t } = useTypeSafeTranslation();

  return (
    <>
      <VerticalUserInfo user={user} />
      <div className={`flex mb-5 items-center w-full justify-center`}>
        {/* @todo add real icon */}
        {user.id !== conn.user.id ? (
          <Button
            loading={followLoading}
            onClick={async () => {
              await mutateAsync([user.id, !user.youAreFollowing]);
              updater(["getUserProfile", idOrUsernameUsedForQuery], (u) =>
                !u
                  ? u
                  : {
                      ...u,
                      numFollowers:
                        u.numFollowers + (user.youAreFollowing ? -1 : 1),
                      youAreFollowing: !user.youAreFollowing,
                    }
              );
            }}
            size="small"
            color={user.youAreFollowing ? "secondary" : "primary"}
            icon={user.youAreFollowing ? null : <Friends />}
          >
            {user.youAreFollowing ? <>Unfollow</> : <>Follow</>}
          </Button>
        ) : null}
      </div>
    </>
  );
};
