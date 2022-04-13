import React, {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  ReactNode,
} from "react";

const sizeClassnames = {
  big: "py-2 px-6 text-sm rounded-lg",
  medium: "py-2 px-5 text-sm rounded",
  small: "px-2 py-1 text-sm rounded-md",
  tiny: "px-1 text-sm rounded-5",
};

const colorClassnames = {
  outline: "border-2 border-black font-bold",
  primary:
    "text-button bg-primary-300 transition duration-200 ease-in-out  disabled:text-green-200 disabled:bg-primary-200",
};

export type ButtonProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  size?: keyof typeof sizeClassnames;
  color?: keyof typeof colorClassnames;
  loading?: boolean;
  icon?: ReactNode;
  transition?: boolean;
};

export const Button: React.FC<ButtonProps> = ({
  children,
  color = "primary",
  size = "small",
  loading,
  icon,
  transition,
  disabled,
  className = "",
  ...props
}) => {
  return (
    <button
      disabled={loading || disabled}
      className={`flex outline-none  ${sizeClassnames[size]} ${
        transition ? `transition duration-200 ease-in-out` : ``
      } ${
        colorClassnames[color]
      }  flex items-center justify-center ${className}`}
      {...props}
    >
      <span className={loading ? "opacity-0" : `flex items-center`}>
        {icon ? <span className={`mr-2 items-center`}>{icon}</span> : null}
        {children}
      </span>
      {loading ? <span className={`absolute`}>loading...</span> : null}
    </button>
  );
};
