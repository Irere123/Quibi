import React from "react";
import Link from "next/link";

import { AccountIcon, CompassIcon, HomeIcon, SchoolIcon } from "../../icons";
import AtIcon from "../../icons/AtIcon";
import { BoxedIcon } from "../../ui/BoxedIcon";
import { Tooltip } from "../../ui/Tooltip";
import { SingleUser } from "../../ui/UserAvatar";
import avatar from "../../img/avatar.jpg";
import { useRouter } from "next/router";
import { useTypeSafeTranslation } from "../../hooks/useTypeSafeTranslation";

export const LeftPannel: React.FC = () => {
  const { t } = useTypeSafeTranslation();

  return (
    <div className="flex flex-col items-center gap-5">
      <Tooltip text={t("components.panels.right.home")}>
        <Link href={"/dash"} passHref>
          <BoxedIcon circle shadow>
            <HomeIcon />
          </BoxedIcon>
        </Link>
      </Tooltip>
      <Tooltip text={t("components.panels.right.discovery")}>
        <Link href={"/discovery"} passHref>
          <BoxedIcon circle shadow>
            <CompassIcon />
          </BoxedIcon>
        </Link>
      </Tooltip>
      <Tooltip text={t("components.panels.right.chat")}>
        <Link href={"/chat"} passHref>
          <BoxedIcon circle shadow>
            <AtIcon />
          </BoxedIcon>
        </Link>
      </Tooltip>
      <Tooltip text={t("components.panels.right.works")}>
        <Link href={"/works"} passHref>
          <BoxedIcon circle shadow>
            <SchoolIcon />
          </BoxedIcon>
        </Link>
      </Tooltip>
    </div>
  );
};

export const RightPanel: React.FC = () => {
  const { t } = useTypeSafeTranslation();

  return (
    <div className="flex flex-col gap-2">
      <div>
        <p className="text-secondary-200">{t("components.panels.sponsored")}</p>
        <div className="bg-secondary-300 p-3 rounded text-primary-900">
          <p>Riviera High School</p>
          <p>
            Privacy policy we only own your username and email so dont worry
          </p>
        </div>
      </div>
      <div>
        <p className="text-primary-100">{t("components.panels.cantacts")}</p>
        <div className="flex flex-col gap-3 mt-4 bg-primary-800 border border-accent rounded-lg p-4  max-w-md w-full">
          <div className="flex gap-2 items-center">
            <SingleUser size="md" isOnline={true} src={avatar.src} />
            <div className="flex flex-col">
              <p className="truncate text-primary-100">John Doe</p>
              <p className="truncate text-primary-300 text-sm">
                Hi, i love everyone
              </p>
            </div>
          </div>
          <div className="flex gap-2 items-center">
            <SingleUser size="md" isOnline={true} src={avatar.src} />
            <div className="flex flex-col">
              <p className="truncate text-primary-100">John Doe</p>
              <p className="truncate text-primary-300 text-sm">
                Hi, i love everyone
              </p>
            </div>
          </div>
          <div className="flex gap-2 items-center">
            <SingleUser isOnline={true} size="md" src={avatar.src} />
            <div className="flex flex-col">
              <p className="truncate text-primary-100">John Doe</p>
              <p className="truncate text-primary-300 text-sm">
                Hi, i love everyone
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const SettingsLeftPanel: React.FC = () => {
  const { pathname } = useRouter();
  const { t } = useTypeSafeTranslation();
  const activeCSS = (link: string) => {
    if (pathname === link) {
      return "bg-primary-700 px-3 rounded py-1 ";
    }
    return "";
  };

  return (
    <div className="flex flex-col gap-5  items-center mt-5">
      <div>
        <p className="text-primary-300 font-bold">USER SETTINGS</p>
        <Link href={"/settings"} passHref>
          <p
            className={`text-primary-200 mt-4 cursor-pointer ${activeCSS(
              "/settings"
            )}`}
          >
            {t("pages.settings.account.label")}
          </p>
        </Link>
        <Link href={"/settings/languages"} passHref>
          <p
            className={`text-primary-200 cursor-pointer ${activeCSS(
              "/settings/languages"
            )}`}
          >
            {t("pages.settings.language.label")}
          </p>
        </Link>
        <Link href={"/settings/languages"} passHref>
          <p
            className={`text-primary-200 cursor-pointer ${activeCSS(
              "/settings/security"
            )}`}
          >
            Security
          </p>
        </Link>
      </div>
      <div>
        <p className="text-primary-300 font-bold mr-2">APP SETTINGS </p>
        <Link href={"/settings/appearance"} passHref>
          <p
            className={`text-primary-200 cursor-pointer ${activeCSS(
              "/settings/appearance"
            )}`}
          >
            {t("pages.settings.appearance.label")}
          </p>
        </Link>
        <Link href={"/settings/notifications"} passHref>
          <p
            className={`text-primary-200 cursor-pointer ${activeCSS(
              "/settings/notifications"
            )}`}
          >
            {t("pages.settings.notifications.label")}
          </p>
        </Link>
        <Link href={"/settings/keybinds"} passHref>
          <p
            className={`text-primary-200 cursor-pointer ${activeCSS(
              "/settings/keybinds"
            )}`}
          >
            {t("pages.settings.keybinds.label")}
          </p>
        </Link>
      </div>
    </div>
  );
};
