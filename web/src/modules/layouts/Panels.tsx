import React from "react";
import Link from "next/link";

import { AccountIcon, HomeIcon, LocationIcon, SchoolIcon } from "../../icons";
import AtIcon from "../../icons/AtIcon";
import { BoxedIcon } from "../../ui/BoxedIcon";
import Tooltip from "../../ui/Tooltip";
import { SingleUser } from "../../ui/UserAvatar";
import avatar from "../../img/avatar.jpg";
import { useRouter } from "next/router";

export const LeftPannel: React.FC = () => {
  return (
    <div className="flex flex-col items-center gap-5">
      <Tooltip text="Home">
        <Link href={"/dash"} passHref>
          <BoxedIcon circle shadow>
            <HomeIcon />
          </BoxedIcon>
        </Link>
      </Tooltip>
      <Tooltip text="Chat">
        <Link href={"/chat"} passHref>
          <BoxedIcon circle shadow>
            <AtIcon />
          </BoxedIcon>
        </Link>
      </Tooltip>
      <Tooltip text="Works">
        <Link href={"/works"} passHref>
          <BoxedIcon circle shadow>
            <SchoolIcon />
          </BoxedIcon>
        </Link>
      </Tooltip>
      <Tooltip text="Account">
        <Link href={"/account"} passHref>
          <BoxedIcon circle shadow>
            <AccountIcon />
          </BoxedIcon>
        </Link>
      </Tooltip>
      <Tooltip text="Discovery">
        <Link href={"/discovery"} passHref>
          <BoxedIcon circle shadow>
            <LocationIcon />
          </BoxedIcon>
        </Link>
      </Tooltip>
    </div>
  );
};

export const RightPanel: React.FC = () => {
  return (
    <div className="flex flex-col gap-2">
      <div>
        <p>Sponsored</p>
        <div className="bg-primary-300 p-3 rounded">
          <p>Riviera High School</p>
          <p>
            Privacy policy we only own your username and email so dont worry
          </p>
        </div>
      </div>
      <div>
        <p>Contacts</p>
        <div className="flex flex-col gap-3 mt-4">
          <div className="flex gap-2 items-center">
            <SingleUser size="sm" src={avatar.src} />
            <p>John Doe</p>
          </div>
          <div className="flex gap-2 items-center">
            <SingleUser size="sm" src={avatar.src} />
            <p>Mike Angel</p>
          </div>
          <div className="flex gap-2 items-center">
            <SingleUser isOnline={true} size="sm" src={avatar.src} />
            <p>Mark Zack</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export const SettingsLeftPanel: React.FC = () => {
  const { pathname } = useRouter();
  const activeCSS = (link: string) => {
    if (pathname === link) {
      return "bg-primary-300 px-3 rounded py-1 ";
    }
    return "";
  };

  return (
    <div className="flex flex-col gap-5  items-center mt-5">
      <div>
        <p className="font-bold">USER SETTINGS</p>
        <Link href={"/settings"} passHref>
          <p className={`mt-4 cursor-pointer ${activeCSS("/settings")}`}>
            Account
          </p>
        </Link>
        <Link href={"/settings/languages"} passHref>
          <p className={`cursor-pointer ${activeCSS("/settings/languages")}`}>
            Languages
          </p>
        </Link>
      </div>
      <div>
        <p className="font-bold mr-2">APP SETTINGS </p>
        <Link href={"/settings/appearance"} passHref>
          <p className={`cursor-pointer ${activeCSS("/settings/appearance")}`}>
            Appearance
          </p>
        </Link>
        <Link href={"/settings/notifications"} passHref>
          <p
            className={`cursor-pointer ${activeCSS("/settings/notifications")}`}
          >
            Notifications
          </p>
        </Link>
        <Link href={"/settings/keybinds"} passHref>
          <p className={`cursor-pointer ${activeCSS("/settings/keybinds")}`}>
            Keybinds
          </p>
        </Link>
      </div>
    </div>
  );
};
