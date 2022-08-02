import React from "react";
import { PlusIcon } from "../../../icons";
import { BoxedIcon } from "../../../ui/BoxedIcon";

export interface Props {}

export const RoomForumRightPanel: React.FC<Props> = () => {
  return (
    <div className="flex flex-col flex-1 mb-3 rounded-md bg-primary-800">
      <div className="px-4 py-3 bg-primary-800 border-b border-primary-600 flex justify-between items-center">
        <h5 className="text-primary-100 font-bold">Rooms</h5>
        <BoxedIcon style={{ height: "26px", width: "26px" }} transition>
          <PlusIcon width={12} height={12} />
        </BoxedIcon>
      </div>
    </div>
  );
};
