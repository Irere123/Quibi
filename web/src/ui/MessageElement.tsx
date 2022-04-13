import React from "react";
import { SingleUser } from "./UserAvatar";

export interface MessageElementProps {
  user: {
    username: string;
    avatar: string;
    isOnline: boolean;
  };
  msg: {
    dt: string;
    text: string;
  };
}

export const MessageElement: React.FC<MessageElementProps> = ({
  user,
  msg,
}) => {
  return (
    <div
      className={`flex items-center px-4  py-2 rounded w-full cursor-pointer`}
    >
      <div className="flex mr-3">
        <SingleUser size="sm" isOnline={user.isOnline} src={user.avatar} />
      </div>
      <div
        className="flex-col py-3 border-b border-green-300 md:border-none md:py-0"
        style={{
          width: "calc(100% - 50px)",
        }}
      >
        <div className="flex justify-between">
          <div className="flex gap-2 items-center">
            <span
              className="text-button font-bold inline-block truncate mr-1"
              style={{
                lineHeight: "22px",
              }}
            >
              {user.username}
            </span>
            <span className="text-xs">{msg.dt}</span>
          </div>
        </div>
        <div
          className="block text-sm text-black font-medium truncate w-9/12"
          style={{
            lineHeight: "22px",
          }}
        >
          {msg.text}
        </div>
      </div>
    </div>
  );
};
