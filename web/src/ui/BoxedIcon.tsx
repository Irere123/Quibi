import React from "react";

const colorMap = {
  "700": "bg-primary-700",
  "800": "bg-primary-800",
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
  color = "700",
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
      } ${hover ? `` : `hover:bg-primary-600`} h-10 w-10 spacing: {
        0: "0px",
        1: "5px",
        1.5: "6px",
        2: "10px",
        3: "15px",
        4: "20px",
        4.5: "25px",
        5: "30px",
        5.5: "35px",
        6: "40px",
        6.5: "50 cursor-pointer justify-center items-center ${
          circle ? `rounded-full` : `rounded`
        } ${className.includes("text-button") ? "" : "text-primary-100"}
        ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
