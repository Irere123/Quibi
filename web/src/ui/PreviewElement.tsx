import React from "react";
import { SingleUser } from "./UserAvatar";

export interface PreviewElementProps {
  isBot?: boolean;
  isOnline?: boolean;
  avatar?: string;
  name?: string;
  msg?: {
    t: string;
    text: string;
  };
  onClick?: () => void;
}

export const PreviewElement: React.FC<PreviewElementProps> = ({
  avatar,
  msg,
  name,
  isOnline,
  isBot,
  onClick,
}) => {
  return (
    <div className="flex gap-2 items-center cursor-pointer" onClick={onClick}>
      <SingleUser isOnline={isOnline} isBot={isBot} size="sm" src={avatar!} />
      <div className="flex gap-3 ">
        <div>
          <p>{name!.slice(0, 10)}</p>
          <span className="text-sm">
            {msg!.text.length > 15 ? (
              <>{msg?.text.slice(0, 15)}...</>
            ) : (
              msg?.text
            )}
          </span>
        </div>
        <div className="flex flex-col">
          <span className="text-xs mt-1">{msg!.t}</span>
        </div>
      </div>
    </div>
  );
};
