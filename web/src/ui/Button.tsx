import React, {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  ReactNode,
} from "react";
import { Spinner } from "./Spinner";

const sizeClassnames = {
  big: "py-2 px-6 text-sm rounded-8",
  medium: "py-2 px-5 text-sm rounded",
  small: "px-2 py-1 text-sm rounded-5",
  tiny: "px-1 text-sm rounded-5",
};

const colorClassnames = {
  primary:
    "text-black bg-accent transition duration-200 ease-in-out hover:bg-accent-hover disabled:text-accent-disabled disabled:bg-accent-hover",
  secondary:
    "text-primary-100 bg-primary-700 hover:bg-primary-600 disabled:text-primary-300",
  "secondary-800":
    "text-primary-100 bg-primary-800 hover:bg-primary-600 disabled:text-primary-300",
  "primary-300":
    "text-primary-100 bg-primary-700 hover:bg-primary-600 disabled:text-primary-300",
  transparent: "text-button bg-transparent",
  "accent-secondary":
    "text-primary-100 bg-secondary hover:bg-secondary-washed-out disabled:text-secondary-washed-out",
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
      {loading ? (
        <span className={`absolute`}>
          <Spinner />
        </span>
      ) : null}
    </button>
  );
};
