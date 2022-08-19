import React from "react";

export const BaseSettingsItem: React.FC<{
  className?: string;
  children?: React.ReactNode;
}> = ({ children, className = "" }) => {
  return (
    <div className={`bg-primary-700 p-4 rounded-8 ${className}`}>
      {children}
    </div>
  );
};
