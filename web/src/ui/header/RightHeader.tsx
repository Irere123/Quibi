import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { AccountIcon, DownloadIcon, HomeIcon, SettingsIcon } from "../../icons";
import { SingleUser } from "../UserAvatar";
import { Button } from "../Button";
import { BoxedIcon } from "../BoxedIcon";
import { useConn } from "../../hooks/useConn";
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
    <div className="flex space-x-4 items-center justify-end focus:outline-no-chrome w-full">
      <Link href={"/u/account"}>
        <a>
          <BoxedIcon circle shadow>
            <AccountIcon />
          </BoxedIcon>
        </a>
      </Link>
      {showHome ? (
        <Link href={"/dash"}>
          <a>
            <BoxedIcon circle shadow>
              <HomeIcon />
            </BoxedIcon>
          </a>
        </Link>
      ) : (
        <Link href={"/settings"}>
          <a>
            <BoxedIcon circle>
              <SettingsIcon />
            </BoxedIcon>
          </a>
        </Link>
      )}

      <Button icon={<DownloadIcon />}>Download</Button>

      {actionButton}

      <div onClick={() => push(`/u/irere`)}>
        <SingleUser
          className={"focus:outline-no-chrome cursor-pointer"}
          size="sm"
          src={conn.user.avatarUrl}
        />
      </div>
    </div>
  );
};

export default RightHeader;
