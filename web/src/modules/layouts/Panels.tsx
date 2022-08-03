import React from "react";
import Link from "next/link";

import { CompassIcon, HomeIcon, SchoolIcon } from "../../icons";
import AtIcon from "../../icons/AtIcon";
import { BoxedIcon } from "../../ui/BoxedIcon";
import { Tooltip } from "../../ui/Tooltip";
import avatar from "../../img/avatar.jpg";
import { useRouter } from "next/router";
import { useTypeSafeTranslation } from "../../hooks/useTypeSafeTranslation";
import { UpcomingEventsCard } from "../../ui/UpcomingEventsCard";
import { Button } from "../../ui/Button";
import { modalConfirm } from "../../shared-components/ConfirmModal";
import { useTokenStore } from "../auth/useTokenStore";
import { useConn } from "../../hooks/useConn";

export const LeftPannel: React.FC = () => {
  const { t } = useTypeSafeTranslation();

  return (
    <div className="flex flex-col items-center gap-5">
      <Tooltip text={t("components.panels.right.home")}>
        <Link href={"/dash"}>
          <a>
            <BoxedIcon circle shadow>
              <HomeIcon />
            </BoxedIcon>
          </a>
        </Link>
      </Tooltip>
      <Tooltip text={t("components.panels.right.acedemic")}>
        <Link href={"/u/academic"}>
          <a>
            <BoxedIcon circle shadow>
              <SchoolIcon />
            </BoxedIcon>
          </a>
        </Link>
      </Tooltip>
      <Tooltip text={t("components.panels.right.chat")}>
        <Link href={"/chat"}>
          <a>
            <BoxedIcon circle shadow>
              <AtIcon />
            </BoxedIcon>
          </a>
        </Link>
      </Tooltip>
      <Tooltip text={t("components.panels.right.explore")}>
        <Link href={"/explore"}>
          <a>
            <BoxedIcon circle shadow>
              <CompassIcon />
            </BoxedIcon>
          </a>
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
        <Link href={"/ads-1"}>
          <a>
            <div className="bg-secondary-300 p-3 rounded text-primary-900">
              <p className="font-bold">Riviera High School</p>
              <p className="font-light">
                Our school is the best one join it and get unlimited resources
                and more Join now we have a discount this month
              </p>
            </div>
          </a>
        </Link>
      </div>
      <UpcomingEventsCard
        events={[
          {
            onClick: () => {
              console.log("hello world");
            },
            id: "34",
            scheduledFor: new Date(),
            planersInfo: {
              avatars: [avatar.src, avatar.src],
              planers: ["Irere", "John"],
            },
            title: "Chemistry hangout",
          },
          {
            onClick: () => {
              console.log("hello world");
            },
            id: "34",
            scheduledFor: new Date(),
            planersInfo: {
              avatars: [avatar.src, avatar.src],
              planers: ["Irere", "John"],
            },
            title: "Maths Course",
          },
        ]}
        onCreateScheduledEvent={() => console.log("Hello world")}
      />
    </div>
  );
};

export const SettingsLeftPanel: React.FC = () => {
  const conn = useConn();
  const { pathname, push } = useRouter();
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
            className={`text-primary-200 cursor-pointer ${activeCSS(
              "/settings"
            )}`}
          >
            {t("pages.settings.language.label")}
          </p>
        </Link>
        <Link href={"/settings/security"} passHref>
          <p
            className={`text-primary-200 cursor-pointer ${activeCSS(
              "/settings/security"
            )}`}
          >
            {t("pages.settings.security.label")}
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
        <Button
          className="mt-2"
          size="medium"
          onClick={() =>
            modalConfirm("Are you sure you want to logout", () => {
              conn.close();
              useTokenStore
                .getState()
                .setTokens({ accessToken: "", refreshToken: "" });

              push("/");
            })
          }
        >
          Logout
        </Button>
      </div>
    </div>
  );
};
