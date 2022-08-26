import React from "react";

const sizeClassnames = {
  default: "h-6 py-2 px-3 text-md",
  sm: "h-5.5 py-2 px-3 text-sm",
};

const variantClassnames = {
  outlined: "border-2 border-primary-600 rounded-20",
  filled: "bg-primary-800 rounded-20 hover:bg-primary-700",
  squared: "bg-primary-800 rounded",
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
