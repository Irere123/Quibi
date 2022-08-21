import React from "react";

const sizeClassnames = {
  default: "py-2 px-3 text-md",
  sm: "py-1 px-2 text-sm",
};

const variantClassnames = {
  outlined: "",
  filled: "bg-primary-800 rounded-20",
  squared: "",
};

export interface ChipProps {
  label: string;
  icon?: React.ReactNode;
  disabled?: boolean;
  size?: keyof typeof sizeClassnames;
  variant?: keyof typeof variantClassnames;
  onClick?: () => void;
  children?: React.ReactNode;
}

export const Chip: React.FC<ChipProps> = ({
  size = "default",
  label,
  disabled,
  variant = "filled",
  icon,
  onClick,
}) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`flex items-center justify-center gap-2 ${variantClassnames[variant]} text-primary-200 ${sizeClassnames[size]}`}
    >
      {icon && <div>{icon}</div>}
      <div>{label}</div>
    </button>
  );
};
