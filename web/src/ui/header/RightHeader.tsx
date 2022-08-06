import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { AppsIcon, DownloadIcon, HomeIcon, SettingsIcon } from "../../icons";
import { SingleUser } from "../Avatars";
import { Button } from "../Button";
import { BoxedIcon } from "../BoxedIcon";
import { useConn } from "../../hooks/useConn";
import { DropdownController } from "../DropdownController";
import { MenuDropDown } from "../MenuDropDown";
import { ApiPreloadLink } from "../../shared-components/ApiPreloadLink";
import { SettingsDropdown } from "../SettingsDropdown";
export interface RightHeaderProps {
  actionButton?: React.ReactNode;
}

const RightHeader: React.FC<RightHeaderProps> = ({ actionButton }) => {
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

      {showHome ? (
        <Link href={"/dash"}>
          <a>
            <BoxedIcon circle={true} shadow={true}>
              <HomeIcon />
            </BoxedIcon>
          </a>
        </Link>
      ) : (
        <Link href={"/settings"}>
          <a>
            <BoxedIcon circle={true}>
              <SettingsIcon />
            </BoxedIcon>
          </a>
        </Link>
      )}

      <Button icon={<DownloadIcon />}>Download</Button>

      {actionButton}

      <ApiPreloadLink data={{ username: conn.user.username }} route="profile">
        <SingleUser
          className={"focus:outline-no-chrome cursor-pointer"}
          size="sm"
          src={conn.user.avatarUrl}
          username={conn.user.username}
        />
      </ApiPreloadLink>
    </div>
  );
};

export default RightHeader;
