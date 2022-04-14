import React from "react";

export interface SettingsWrapperProps {}

export const SettingsWrapper: React.FC<SettingsWrapperProps> = ({
  children,
}) => {
  return <div className={` rounded w-full p-3 mt-4`}>{children}</div>;
};
