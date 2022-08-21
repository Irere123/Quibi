import React from "react";
import Link from "next/link";
import {
  AtIcon,
  BroadcastIcon,
  CalendarMonth,
  HomeIcon,
  Notification,
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
          <BoxedIcon circle>
            <HomeIcon />
          </BoxedIcon>
        </a>
      </Link>
      <Link href={"/explore"}>
        <a>
          <BoxedIcon circle>
            <BroadcastIcon />
          </BoxedIcon>
        </a>
      </Link>
      <Link href={"/events"}>
        <a>
          <BoxedIcon circle>
            <CalendarMonth />
          </BoxedIcon>
        </a>
      </Link>

      <Link href={"/notifications"}>
        <a>
          <BoxedIcon circle>
            <Notification />
          </BoxedIcon>
        </a>
      </Link>
    </div>
  );
};
