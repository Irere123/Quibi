import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { AppsIcon, DownloadIcon, HomeIcon, SettingsIcon } from "../../icons";
import { SingleUser } from "../Avatars";
import { Button } from "../Button";
import { BoxedIcon } from "../BoxedIcon";
import { ApiPreloadLink } from "../../shared-components/ApiPreloadLink";
import { useConn } from "../../hooks/useConn";
import { useScreenType } from "../../hooks/useScreenType";
import { DropdownController } from "../DropdownController";
import { SettingsDropdown } from "../SettingsDropdown";
import { modalConfirm } from "../../shared-components/ConfirmModal";
import { useCurrentQuizIdStore } from "../../stores/useCurentQuizIdStore";
import { useTokenStore } from "../../modules/auth/useTokenStore";

export interface RightHeaderProps {
  actionButton?: React.ReactNode;
}

const RightHeader: React.FC<RightHeaderProps> = ({ actionButton }) => {
  const screenType = useScreenType();
  const conn = useConn();
  const { pathname, push } = useRouter();
  let showHome = false;

  if (pathname.includes("/chat") || pathname.includes("/settings")) {
    showHome = true;
  } else if (pathname.includes("/account")) {
    showHome = true;
  }

  return (
    <div className="flex  space-x-4 items-center justify-end focus:outline-no-chrome w-full">
      <BoxedIcon circle={true}>
        <AppsIcon />
      </BoxedIcon>

      {actionButton}

      <DropdownController
        zIndex={20}
        className="top-9 right-3 md:right-0 fixed"
        innerClassName="fixed  transform -translate-x-full"
        overlay={(close) => (
          <SettingsDropdown
            onActionButtonClicked={() => {
              modalConfirm("Are you sure", () => {
                conn.close();
                useCurrentQuizIdStore.getState().setCurrentQuizId(null);
                useTokenStore
                  .getState()
                  .setTokens({ accessToken: "", refreshToken: "" });
                push("/logout");
              });
            }}
            onCloseDropdown={close}
            user={conn.user}
          />
        )}
      >
        <SingleUser
          className={"focus:outline-no-chrome"}
          size="sm"
          src={conn.user.avatarUrl}
        />
      </DropdownController>
    </div>
  );
};

export default RightHeader;
