import React from "react";
import { UserWithFollowInfo } from "@quibi/client";
import { useConn } from "../../hooks/useConn";
import { useTypeSafeMutation } from "../../hooks/useTypeSafeMutation";
import { useTypeSafeTranslation } from "../../hooks/useTypeSafeTranslation";
import { useTypeSafeUpdateQuery } from "../../hooks/useTypeSafeUpdateQuery";
import { Friends } from "../../icons";
import { Button } from "../../ui/Button";
import { VerticalUserInfo } from "../../ui/VerticalUserInfo";

interface VerticalUserInfoControllerProps {
  user: UserWithFollowInfo;
  idOrUsernameUsedForQuery: string;
}

export const VerticalUserInfoWithFollowButton: React.FC<
  VerticalUserInfoControllerProps
> = ({ idOrUsernameUsedForQuery, user }) => {
  const { mutateAsync: follow, isLoading: followLoading } =
    useTypeSafeMutation("follow");
  const { mutateAsync: unfollow, isLoading: unfollowLoading } =
    useTypeSafeMutation("unFollow");
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
            loading={followLoading || unfollowLoading}
            onClick={async () => {
              if (!user.youAreFollowing) {
                await follow([user.id]);
                updater(["getUserProfile", idOrUsernameUsedForQuery], (u) =>
                  !u
                    ? u
                    : {
                        ...u,
                        numFollowers: u.numFollowers + 1,
                        youAreFollowing: !user.youAreFollowing,
                      }
                );
              } else {
                await unfollow([user.id]);
                updater(["getUserProfile", idOrUsernameUsedForQuery], (u) =>
                  !u
                    ? u
                    : {
                        ...u,
                        numFollowers: u.numFollowers - 1,
                        youAreFollowing: !user.youAreFollowing,
                      }
                );
              }
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
