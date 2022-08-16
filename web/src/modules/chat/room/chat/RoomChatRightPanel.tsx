import React from "react";
import {
  AccountTree,
  MoreVert,
  PersonAdd,
  SearchIcon,
} from "../../../../icons";
import avatar from "../../../../img/avatar3.jpg";
import { kFormatter } from "../../../../lib/kFormatter";
import { truncate } from "../../../../lib/truncate";
import { BoxedIcon } from "../../../../ui/BoxedIcon";
import { Tag } from "../../../../ui/Tag";
import { SingleUser } from "../../../../ui/Avatars";

export const RoomChatRightPanel: React.FC = () => {
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
        <SingleUser outline src={avatar.src} username="hello" isOnline={true} />
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
    </div>
  );
};
