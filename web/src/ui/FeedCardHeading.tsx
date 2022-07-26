import React, { ReactElement, ReactNode } from "react";

export interface RoomCardHeadingProps {
  icon?: ReactElement;
  content?: ReactNode;
  text: string;
}

export const FeedCardHeading: React.FC<RoomCardHeadingProps> = ({
  text,
  icon,
  content,
}) => {
  return (
    <div className="flex text-primary-100 font-bold leading-5 truncate w-full">
      {icon ? <span className="mr-2 align-middle">{icon}</span> : content}
      <span className="inline truncate">{text}</span>
    </div>
  );
};
