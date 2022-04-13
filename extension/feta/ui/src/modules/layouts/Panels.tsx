import Link from "next/link";
import React from "react";
import { BoxedIcon } from "../../components/BoxedIcon";
import { HomeIcon, HotIcon, PoliceIcon } from "../../icons";

export const LeftPanel: React.FC = () => {
  return (
    <div className="flex flex-col gap-3 ml-4">
      <Link href={"/home"} passHref>
        <BoxedIcon circle shadow>
          <HomeIcon />
        </BoxedIcon>
      </Link>
      <Link href={"/live"} passHref>
        <BoxedIcon circle shadow>
          <HotIcon />
        </BoxedIcon>
      </Link>
      <Link href={"/moderator"} passHref>
        <BoxedIcon circle shadow>
          <PoliceIcon />
        </BoxedIcon>
      </Link>
    </div>
  );
};
