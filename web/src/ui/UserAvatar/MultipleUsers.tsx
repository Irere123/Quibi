import React from "react";

import { SingleUser } from "./SingleUser";

export interface AvatarProps {
  srcArray: string[];
  className?: string;
}

export const MultipleUsers: React.FC<AvatarProps> = ({
  srcArray,
  className = "",
}) => {
  return (
    <div className={`flex ${className}`}>
      {srcArray.slice(0, 3).map((s, i) => (
        <span
          key={s + i}
          className="rounded-full cursor-pointer bg-primary-400 border-2 border-primary-300 shadow-outlineSm"
          style={{
            zIndex: srcArray.length - i,
            marginLeft: i > 0 ? -7 : 0,
            height: 25,
            width: 25,
            overflow: "hidden",
          }}
        >
          <SingleUser src={s} size="xs" />
        </span>
      ))}
    </div>
  );
};
