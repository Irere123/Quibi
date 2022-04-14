import React from "react";

export const BaseSettingsItem: React.FC<{
  className?: string;
  outline?: boolean;
}> = ({ children, className = "", outline }) => {
  return (
    <div
      className={`${
        outline ? "border-2 border-black" : "bg-primary-200"
      } p-4 rounded ${className}`}
    >
      {children}
    </div>
  );
};
