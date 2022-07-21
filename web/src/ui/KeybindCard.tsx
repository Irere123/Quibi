import React from "react";
import { Tag } from "./Tag";

export interface KeybindCardProps {
  command?: string;
  keybind?: string;
}

export const KeybindCard: React.FC<KeybindCardProps> = ({
  command,
  keybind,
}) => {
  const bind = keybind?.split("+").map((x, i) => (
    <Tag className="uppercase" key={x + i}>
      {x.toUpperCase()}
    </Tag>
  ));

  return (
    <button
      className={`w-full bg-primary-800 flex px-3 py-2 rounded justify-between transition`}
    >
      <div>
        <div className="text-primary-200 text-sm uppercase">{command}</div>
      </div>
      <div className="flex items-center">
        <div className="space-x-1 flex">{bind}</div>
      </div>
    </button>
  );
};
