import React from "react";
import { PlusIcon } from "../icons";
import { BoxedIcon } from "./BoxedIcon";

export interface PovHeaderProps {
  username: string;
  avatar: string;
  createdAt: string;
}

export const PovHeader: React.FC<PovHeaderProps> = ({
  avatar,
  createdAt,
  username,
  children,
}) => {
  return (
    <div>
      <BoxedIcon circle>
        <PlusIcon className="transform rotate-45" />
      </BoxedIcon>
    </div>
  );
};
