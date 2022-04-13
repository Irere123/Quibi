import React from "react";

const colorMap = {
  "300": "bg-primary-300",
  "400": "bg-primary-400",
};

export interface BoxedIconProps
  extends React.ComponentPropsWithoutRef<"button"> {
  circle?: boolean;
  transition?: boolean;
  shadow?: boolean;
  hover?: boolean;
  color?: keyof typeof colorMap;
}

export const BoxedIcon: React.FC<BoxedIconProps> = ({
  color = "300",
  children,
  className = "",
  circle = false,
  transition = false,
  shadow = false,
  hover = false,
  ...props
}) => {
  return (
    <button
      className={`flex ${shadow ? "shadow" : ""} ${colorMap[color]} ${
        transition ? `transition duration-200 ease-in-out` : ``
      } ${
        hover ? `` : `hover:bg-primary-300`
      } h-8 w-8 cursor-pointer justify-center items-center ${
        circle ? `rounded-full` : `rounded`
      } ${className.includes("text-button") ? "" : "text-button"}
        ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
