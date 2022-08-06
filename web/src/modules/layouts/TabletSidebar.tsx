import React from "react";
import Link from "next/link";
import {
  AtIcon,
  CompassIcon,
  HomeIcon,
  SchoolIcon,
  SettingsIcon,
} from "../../icons";
import { BoxedIcon } from "../../ui/BoxedIcon";

interface TabletSidebarProps {}

export const TabletSidebar: React.FC<TabletSidebarProps> = ({}) => {
  return (
    <div className="items-center gap-5 pb-5 w-full flex flex-col flex-1 overflow-y-auto text-primary-100">
      <Link href={"/dash"}>
        <a>
          <BoxedIcon circle shadow>
            <HomeIcon />
          </BoxedIcon>
        </a>
      </Link>
      <Link href={"/explore"}>
        <a>
          <BoxedIcon circle shadow>
            <CompassIcon />
          </BoxedIcon>
        </a>
      </Link>
      <Link href={"/u/academic"}>
        <a>
          <BoxedIcon circle shadow>
            <SchoolIcon />
          </BoxedIcon>
        </a>
      </Link>

      <Link href={"/chat"}>
        <a>
          <BoxedIcon circle shadow>
            <AtIcon />
          </BoxedIcon>
        </a>
      </Link>

      <Link href={"/settings"}>
        <a>
          <BoxedIcon circle shadow>
            <SettingsIcon />
          </BoxedIcon>
        </a>
      </Link>
    </div>
  );
};
