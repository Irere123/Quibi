/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";

export const avatarSizeMap = {
  default: "80px",
  lg: "60px",
  md: "50px",
  sm: "40px",
  xs: "20px",
  xxs: "30px",
};

export const onlineIndicatorStyleMap = {
  default: {
    width: "15px",
    height: "15px",
    right: "2px",
    bottom: "-4px",
    borderWidth: "4px",
  },
  lg: {
    width: "12px",
    height: "12px",
    right: "2px",
    bottom: "-2px",
    borderWidth: "2px",
  },
  md: {
    width: "10px",
    height: "10px",
    right: "2px",
    bottom: "-2px",
    borderWidth: "2px",
  },
  sm: {
    width: "8px",
    height: "8px",
    right: "2px",
    bottom: "-2px",
    borderWidth: "2px",
  },
  xs: {
    width: "4px",
    height: "4px",
    right: "0px",
    bottom: "-1px",
    borderWidth: "1px",
  },
  xxs: {
    width: "6px",
    height: "6px",
    right: "1px",
    bottom: "-1px",
    borderWidth: "1px",
  },
};

export interface AvatarProps {
  src: string;
  size?: keyof typeof onlineIndicatorStyleMap;
  className?: string;
  isOnline?: boolean;
  outline?: boolean;
  username?: string;
  hover?: boolean;
  active?: boolean;
  isBot?: boolean;
}

export const SingleUser: React.FC<AvatarProps> = ({
  src,
  size = "default",
  className = "",
  isOnline = false,
  username,
  outline,
  active,
}) => {
  const [isError, setError] = useState(false);
  const sizeStyle = onlineIndicatorStyleMap[size];
  return (
    <div
      className={`relative inline-block ${className}`}
      style={{
        width: avatarSizeMap[size],
        height: avatarSizeMap[size],
      }}
    >
      <img
        alt={username ? `${username}-s-avatar` : "your-avatar"}
        style={{
          boxShadow: active ? "0 0 0 4px var(--color-accent)" : "",
        }}
        className={`rounded-full w-full h-full object-cover ${
          outline && "border-4 border-secondary-300 hover:scale-105"
        }`}
        onError={() => setError(true)}
        src={
          isError
            ? `https://ui-avatars.com/api/${
                username ? `&name=${username}` : "&name"
              }&rounded=true&background=B23439&bold=true&color=FFFFFF`
            : src
        }
      />

      {isOnline && (
        <span
          className={
            "rounded-full absolute box-content bg-secondary-300 border-secondary-400"
          }
          style={sizeStyle}
          data-testid="online-indictor"
        ></span>
      )}
      {/* {isBot && (
        <span
          className={
            "rounded-full absolute box-content bg-primary-800 border-primary-800 text-secondary items-center justify-center"
          }
          style={{ ...sizeStyle, padding: 2, top: -2 }}
          data-testid="online-indictor"
        >
          <BotIcon
            data-testid={`bot:${username}`}
            width={sizeStyle.width}
            height={sizeStyle.width}
          />
        </span>
      )} */}
    </div>
  );
};
