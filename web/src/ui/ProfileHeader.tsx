import React, { ReactChild, useState } from "react";
import { ProfileHeaderWrapper } from "./ProfileHeaderWrapper";
import { Button } from "./Button";
import { SingleUser } from "./Avatars/SingleUser";
import { CalendarMonth, CompassIcon, Friends } from "../icons";
import { EditProfileModal } from "../modules/user/EditProfileModal";
import { FormattedDate } from "./FormattedDate";
import { UserBadge } from "./UserBadge";
import { useTypeSafeUpdateQuery } from "../hooks/useTypeSafeUpdateQuery";
import { usePreloadPush } from "../shared-components/ApiPreloadLink";
import { useTypeSafeMutation } from "../hooks/useTypeSafeMutation";
import { useTypeSafeTranslation } from "../hooks/useTypeSafeTranslation";

export interface ProfileHeaderProps {
  displayName: string;
  username: string;
  children?: ReactChild;
  pfp?: string;
  isCurrentUser?: boolean;
  user: any;
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  displayName,
  username,
  user,
  children,
  isCurrentUser,
  pfp = "https://dogehouse.tv/favicon.ico",
}) => {
  const { t } = useTypeSafeTranslation();
  const [showEditProfileModal, setShowEditProfileModal] = useState(false);
  const { mutateAsync: follow, isLoading: followLoading } =
    useTypeSafeMutation("follow");
  const { mutateAsync: unfollow, isLoading: unfollowLoading } =
    useTypeSafeMutation("unFollow");
  const { mutateAsync: block, isLoading: blockLoading } =
    useTypeSafeMutation("userBlock");
  const { mutateAsync: unblock, isLoading: unblockLoading } =
    useTypeSafeMutation("userUnblock");
  const preloadPush = usePreloadPush();
  const updater = useTypeSafeUpdateQuery();

  return (
    <div className="bg-primary-800 rounded-lg relative">
      <ProfileHeaderWrapper
        coverUrl={user.bannerUrl || "https://source.unsplash.com/random"}
      >
        <EditProfileModal
          isOpen={showEditProfileModal}
          onRequestClose={() => setShowEditProfileModal(!showEditProfileModal)}
          onEdit={(d) => {
            updater(["getUserProfile", d.username], (x) =>
              !x ? x : { ...x, ...d }
            );
            if (d.username !== username) {
              preloadPush({
                route: "profile",
                data: { username: d.username },
              });
            }
          }}
        />
        <div className="flex mr-4 ">
          <SingleUser
            isOnline={user.online}
            className="absolute flex-none -top-5.5 rounded-full shadow-outlineLg bg-primary-900"
            src={pfp}
          />
        </div>
        <div className="flex flex-col w-3/6 font-sans">
          <h4 className="text-primary-100 font-bold truncate">{displayName}</h4>
          <div className="flex flex-col justify-center">
            <p
              className="text-primary-300 mr-2"
              data-testid="profile-info-username"
            >{`@${username}`}</p>
            <div className="flex items-center gap-3 text-primary-600">
              <p>
                {user.numFollowers} {t("pages.viewUser.followers")}
              </p>
              <p>
                {user.numFollowing} {t("pages.viewUser.following")}
              </p>
            </div>
            {user.followsYou ? (
              <UserBadge color="grey" variant="primary-700">
                {t("pages.viewUser.followsYou")}
              </UserBadge>
            ) : null}
          </div>
        </div>

        <div className="w-3/6 ">
          <div className="flex flex-row justify-end content-end gap-2">
            {!isCurrentUser && (
              <Button
                size="small"
                loading={blockLoading || unblockLoading}
                color={user.iBlockedThem ? "secondary" : "primary"}
                onClick={async () => {
                  if (user.iBlockedThem) {
                    await unblock([user.id]);
                    updater(["getUserProfile", username], (u) =>
                      !u
                        ? u
                        : {
                            ...u,
                            iBlockedThem: false,
                          }
                    );
                  } else {
                    await block([user.id]);
                    updater(["getUserProfile", username], (u) =>
                      !u
                        ? u
                        : {
                            ...u,
                            iBlockedThem: true,
                          }
                    );
                  }
                }}
              >
                {user.iBlockedThem
                  ? t("pages.viewUser.unblock")
                  : t("pages.viewUser.block")}
              </Button>
            )}
            {!isCurrentUser && (
              <Button
                onClick={async () => {
                  if (!user.youAreFollowing) {
                    await follow([user.id]);
                    updater(["getUserProfile", username], (u) =>
                      !u || "error" in u
                        ? u
                        : {
                            ...u,
                            numFollowers: u.numFollowers + 1,
                            youAreFollowing: !user.youAreFollowing,
                          }
                    );
                  } else {
                    await unfollow([user.id]);
                    updater(["getUserProfile", username], (u) =>
                      !u || "error" in u
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
                loading={followLoading || unfollowLoading}
                color={user.youAreFollowing ? "secondary" : "primary"}
                icon={user.youAreFollowing ? null : <Friends />}
              >
                {user.youAreFollowing
                  ? t("pages.viewUser.unfollow")
                  : t("pages.viewUser.followHim")}
              </Button>
            )}
            {isCurrentUser ? (
              <Button
                size="small"
                icon={<CompassIcon />}
                onClick={() => setShowEditProfileModal(!showEditProfileModal)}
              >
                {t("pages.viewUser.editProfile")}
              </Button>
            ) : null}
          </div>
        </div>
      </ProfileHeaderWrapper>
      <div className="p-4 text-primary-200">
        {user.bio ? <p className="text-sm">{user.bio}</p> : null}
        <p className="flex items-center gap-2 mt-3">
          <CalendarMonth width={20} height={20} />
          Joined <FormattedDate date={new Date(user.inserted_at)} />
        </p>
      </div>
    </div>
  );
};
