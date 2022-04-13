import React from "react";

export interface RoomCardHeadingProps {
  text: string;
}

export const FeedCardHeading: React.FC<RoomCardHeadingProps> = ({ text }) => {
  return (
    <div className="flex text-black font-bold leading-5 truncate w-full">
      <span className="inline truncate">{text}</span>
    </div>
  );
};
