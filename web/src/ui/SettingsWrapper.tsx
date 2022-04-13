import React from "react";

export interface SettingsWrapperProps {}

export const SettingsWrapper: React.FC<SettingsWrapperProps> = ({
  children,
}) => {
  return (
    <div className={`bg-primary-100 rounded w-full p-3 mt-4`}>{children}</div>
  );
};
