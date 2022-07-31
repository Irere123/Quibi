import React, { ReactChild, useState } from "react";
import { ProfileHeaderWrapper } from "./ProfileHeaderWrapper";
import { Button } from "./Button";
import { SingleUser } from "./UserAvatar/SingleUser";
import { CalendarMonth, CompassIcon, Friends } from "../icons";
import { EditProfileModal } from "../modules/user/EditProfileModal";
import { FormattedDate } from "./FormattedDate";
import { usePreloadPush } from "../shared-components/ApiPreloadLink";
import { useTypeSafeUpdateQuery } from "../hooks/useTypeSafeUpdateQuery";

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
  const [showEditProfileModal, setShowEditProfileModal] = useState(false);
  const preloadPush = usePreloadPush();
  const update = useTypeSafeUpdateQuery();

  return (
    <div className="bg-primary-800 rounded-lg relative">
      <ProfileHeaderWrapper
        coverUrl={user.bannerUrl || "https://source.unsplash.com/random"}
      >
        <EditProfileModal
          isOpen={showEditProfileModal}
          onRequestClose={() => setShowEditProfileModal(!showEditProfileModal)}
          onEdit={(d) => {
            update(["getUserProfile", d.username], (x) =>
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
          <div className="flex flex-row items-center">
            <p
              className="text-primary-300 mr-2"
              data-testid="profile-info-username"
            >{`@${username}`}</p>
          </div>
        </div>

        <div className="w-3/6 ">
          <div className="flex flex-row justify-end content-end gap-2">
            {!isCurrentUser && (
              <Button
                size="small"
                color={user.iBlockedThem ? "primary-300" : "primary"}
              >
                {user.iBlockedThem ? "Unblock" : "Block"}
              </Button>
            )}
            {!isCurrentUser && (
              <Button
                size="small"
                color={user.youAreFollowing ? "primary-300" : "primary"}
                icon={user.youAreFollowing ? null : <Friends />}
              >
                {user.youAreFollowing ? <>Unfollow</> : <>Follow</>}
              </Button>
            )}
            {isCurrentUser ? (
              <Button
                size="small"
                icon={<CompassIcon />}
                onClick={() => setShowEditProfileModal(!showEditProfileModal)}
              >
                edit profile
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
