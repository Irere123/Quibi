import React, { MouseEventHandler } from "react";
import { PlusIcon } from "../icons";
import { BoxedIcon } from "./BoxedIcon";
import { NativeRadio } from "./NativeRadio";
import { NativeSelect } from "./NativeSelect";

export interface WorkPageHeaderProps {
  title?: string;
  actionTitle?: string;
  content?: React.ReactNode;
  onActionClicked?: MouseEventHandler<HTMLButtonElement>;
  onAddActionClicked?: MouseEventHandler<HTMLButtonElement>;
}

export const WorkPageHeader: React.FC<WorkPageHeaderProps> = ({
  actionTitle,
  children,
  content,
  onActionClicked,
  onAddActionClicked,
  title,
}) => {
  return (
    <div className="flex">
      <h4 className="text-primary-100">For you</h4>
      <div>
        <BoxedIcon>
          <PlusIcon />
        </BoxedIcon>
      </div>
    </div>
  );
};
