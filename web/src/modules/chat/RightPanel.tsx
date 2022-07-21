import React from "react";
import {
  AccountTree,
  MoreVert,
  PersonAdd,
  PushPin,
  SearchIcon,
} from "../../icons";
import avatar from "../../img/avatar3.jpg";
import { kFormatter } from "../../lib/kFormatter";
import { truncate } from "../../lib/truncate";
import { BoxedIcon } from "../../ui/BoxedIcon";
import { DurationTicker } from "../../ui/DurationTicker";
import { Tag } from "../../ui/Tag";
import { SingleUser } from "../../ui/UserAvatar";

export const RightPanel: React.FC = () => {
  return (
    <div className="flex flex-col gap-4 py-3 bg-primary-800 rounded">
      <div className="flex flex-1 pb-1 items-center border-b-2 border-primary-700 px-3">
        <div className="flex-1 items-center gap-2 flex font-bold text-primary-100 text-lg">
          {truncate("Neox_arts", 20)}
          <Tag>{kFormatter(50687)}</Tag>
        </div>
        <div className="text-primary-100 cursor-pointer">
          <MoreVert />
        </div>
      </div>
      <div className="flex flex-col items-center justify-center gap-4">
        <SingleUser active src={avatar.src} username="hello" isOnline />
        <div className="flex gap-3">
          <BoxedIcon>
            <AccountTree />
          </BoxedIcon>
          <BoxedIcon>
            <SearchIcon />
          </BoxedIcon>
          <BoxedIcon>
            <PersonAdd />
          </BoxedIcon>
        </div>
      </div>
      <div className="px-3">
        <div className="flex items-center gap-4 text-primary-100">
          <span>
            <PushPin className="transform rotate-45" />
          </span>
          <span className="font-semibold">Pinned</span>
        </div>
        <div>
          <div className="font-bold text-secondary-300">
            <DurationTicker dt={new Date()} />
          </div>
        </div>
      </div>
    </div>
  );
};
