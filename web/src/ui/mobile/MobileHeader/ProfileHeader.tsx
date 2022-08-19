import router from "next/router";
import React, { HTMLProps } from "react";
import { SearchIcon } from "../../../icons";
import { useTokenStore } from "../../../modules/auth/useTokenStore";
import { modalConfirm } from "../../../shared-components/ConfirmModal";
import { useConn } from "../../../hooks/useConn";
import { SingleUser } from "../../Avatars";
import { useTypeSafeTranslation } from "../../../hooks/useTypeSafeTranslation";

export interface ProfileHeaderProps extends HTMLProps<HTMLDivElement> {
  avatar: string;
  onAnnouncementsClick?: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
  onMessagesClick?: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
  onSearchClick?: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  avatar,
  onSearchClick,
  className = "",
  ...props
}) => {
  return (
    <div
      className={`flex w-full p-3 h-11 justify-between items-center bg-primary-900 ${className}`}
      {...props}
    >
      <button>
        <SingleUser size="md" src={avatar} isOnline={true} />
      </button>
      <div className="flex gap-x-5">
        {onSearchClick && (
          <button onClick={onSearchClick}>
            <SearchIcon className="text-primary-100" height={20} width={20} />
          </button>
        )}
      </div>
    </div>
  );
};
