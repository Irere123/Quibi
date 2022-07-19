import React from "react";

export const BaseSettingsItem: React.FC<{
  className?: string;
}> = ({ children, className = "" }) => {
  return (
    <div className={`bg-primary-700 p-4 rounded-lg ${className}`}>
      {children}
    </div>
  );
};
