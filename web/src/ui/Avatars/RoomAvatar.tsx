import React from "react";
import { generateColorFromString } from "../../lib/generateColor";

export const avatarSizeMap = {
  default: "80px",
  lg: "60px",
  md: "50px",
  sm: "40px",
  xxs: "20px",
  xs: "30px",
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

interface RoomAvatarProps {
  name: string;
  className?: string;
  size?: keyof typeof onlineIndicatorStyleMap;
  isOnline?: boolean;
}

export const RoomAvatar: React.FC<RoomAvatarProps> = ({
  name,
  className,
  size = "default",
  isOnline = false,
}) => {
  const sizeStyle = onlineIndicatorStyleMap[size];

  return (
    <div
      className={`relative inline-block ${className}`}
      style={{
        width: avatarSizeMap[size],
        height: avatarSizeMap[size],
      }}
    >
      <div
        style={{ backgroundColor: generateColorFromString(name) }}
        className="flex items-center justify-center rounded-full w-full h-full"
      >
        <p>{name.charAt(0).toUpperCase()}</p>
      </div>

      {isOnline && (
        <span
          className={
            "rounded-full absolute box-content bg-secondary-300 border-primary-800"
          }
          style={sizeStyle}
        ></span>
      )}
    </div>
  );
};
