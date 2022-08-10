import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { AppsIcon, DownloadIcon, HomeIcon, SettingsIcon } from "../../icons";
import { SingleUser } from "../Avatars";
import { Button } from "../Button";
import { BoxedIcon } from "../BoxedIcon";
import avatar from "../../img/avatar.jpg";

export interface RightHeaderProps {
  actionButton?: React.ReactNode;
}

const RightHeader: React.FC<RightHeaderProps> = ({ actionButton }) => {
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

      <Link href={`/u/irere`}>
        <a>
          <SingleUser
            className={"focus:outline-no-chrome cursor-pointer"}
            size="sm"
            src={avatar.src}
            username={"irere"}
          />
        </a>
      </Link>
    </div>
  );
};

export default RightHeader;
