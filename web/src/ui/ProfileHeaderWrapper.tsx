/* eslint-disable @next/next/no-img-element */
import React, { ReactNode } from "react";

export interface ProfileHeaderWrapperProps {
  children: ReactNode;
  coverUrl: string;
}

export const ProfileHeaderWrapper: React.FC<ProfileHeaderWrapperProps> = ({
  children,
  coverUrl,
  ...props
}) => {
  return (
    <div className="bg-primary-800 rounded-lg relative" {...props}>
      <img
        alt="cover"
        src={coverUrl}
        className="rounded-t-lg w-full object-cover"
        style={{ height: "155px" }}
      />
      <div className="container mx-auto flex p-4 relative">{children}</div>
    </div>
  );
};
