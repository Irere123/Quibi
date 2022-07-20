import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { AccountIcon, DownloadIcon, HomeIcon, SettingsIcon } from "../../icons";
import { SingleUser } from "../UserAvatar";
import src from "../../img/avatar.jpg";
import { Button } from "../Button";
import { BoxedIcon } from "../BoxedIcon";
import { useModalStore } from "../../stores/useModalStore";
import { AccountController } from "../../modules/account/AccountController";

export interface RightHeaderProps {
  actionButton?: React.ReactNode;
}

const RightHeader: React.FC<RightHeaderProps> = ({ actionButton }) => {
  const { setOpenUserAccountModal, openUserAccountModal } = useModalStore();
  const { pathname } = useRouter();
  let showHome = false;

  if (pathname.includes("/chat") || pathname.includes("/settings")) {
    showHome = true;
  } else if (pathname.includes("/account")) {
    showHome = true;
  }

  return (
    <div className="flex space-x-4 items-center justify-end focus:outline-no-chrome w-full">
      <div onClick={() => setOpenUserAccountModal(!openUserAccountModal)}>
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

      <SingleUser
        className={"focus:outline-no-chrome cursor-pointer"}
        size="sm"
        src={src.src}
      />
      {openUserAccountModal && (
        <AccountController
          isOpen={openUserAccountModal}
          onRequestClose={() => setOpenUserAccountModal(!openUserAccountModal)}
        >
          <h1>Hello world</h1>
        </AccountController>
      )}
    </div>
  );
};

export default RightHeader;
