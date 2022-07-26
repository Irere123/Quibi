import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { AccountIcon, DownloadIcon, HomeIcon, SettingsIcon } from "../../icons";
import { SingleUser } from "../UserAvatar";
import src from "../../img/avatar.jpg";
import { Button } from "../Button";
import { BoxedIcon } from "../BoxedIcon";
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
    <div className="flex space-x-4 items-center justify-end focus:outline-no-chrome w-full">
      <div>
        <BoxedIcon circle>
          <AccountIcon />
        </BoxedIcon>
      </div>
      {showHome ? (
        <Link href={"/dash"} passHref>
          <BoxedIcon circle shadow>
            <HomeIcon />
          </BoxedIcon>
        </Link>
      ) : (
        <Link href={"/settings"} passHref>
          <BoxedIcon circle>
            <SettingsIcon />
          </BoxedIcon>
        </Link>
      )}

      <Button icon={<DownloadIcon />}>Download</Button>

      {actionButton}

      <div onClick={() => push(`/u/irere`)}>
        <SingleUser
          className={"focus:outline-no-chrome cursor-pointer"}
          size="sm"
          src={src.src}
        />
      </div>
    </div>
  );
};

export default RightHeader;
