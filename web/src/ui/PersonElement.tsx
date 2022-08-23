import React from "react";
import { useTypeSafeTranslation } from "../hooks/useTypeSafeTranslation";
import { User } from "../modules/ws";
import { SingleUser } from "./Avatars";
import { Button } from "./Button";

export interface PersonElementProps {
  user: any;
}

export const PersonElement: React.FC<PersonElementProps> = ({ user }) => {
  const { t } = useTypeSafeTranslation();
  return (
    <div className="flex gap-4 w-full">
      <div>
        <SingleUser
          src={user.avatarUrl}
          username={user.username}
          size="sm"
          outline={true}
          isOnline={user.online}
        />
      </div>
      <div className="flex flex-1">
        <div className="flex flex-col flex-1">
          <p className="text-primary-100">{user.displayName}</p>
          <p className="text-primary-200">@{user.username}</p>
        </div>
        <div>
          <Button size="small">{t("pages.viewUser.followHim")}</Button>
        </div>
      </div>
    </div>
  );
};
