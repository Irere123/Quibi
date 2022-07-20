import React, { useMemo } from "react";
import { isToday, isYesterday } from "date-fns";
import { generateColorFromString } from "../lib/generateColor";
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
  const dt = useMemo(() => new Date(msg.dt), [msg.dt]);

  return (
    <div
      className={`flex items-center px-4  py-2 rounded w-full cursor-pointer`}
    >
      <div className="flex mr-3">
        <SingleUser size="sm" isOnline={user.isOnline} src={user.avatar} />
      </div>
      <div
        className="flex-col py-3 border-b md:border-none md:py-0"
        style={{
          width: "calc(100% - 50px)",
        }}
      >
        <div className="flex justify-between">
          <div className="flex gap-2 items-center">
            <span
              className="inline hover:underline font-bold focus:outline-none"
              style={{
                lineHeight: "22px",
                textDecorationColor: generateColorFromString(user.username),
                color: generateColorFromString(user.username),
              }}
            >
              {user.username}
            </span>
            <span className="text-xs text-primary-200">
              {isToday(dt) ? (
                <>Today</>
              ) : isYesterday(dt) ? (
                <>Yesterday</>
              ) : (
                <>{dt.getDay()}</>
              )}
            </span>
          </div>
        </div>
        <div
          className="block text-sm text-primary-100 font-medium"
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
