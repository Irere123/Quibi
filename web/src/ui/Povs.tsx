/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React from "react";
import { PlusIcon } from "../icons";

export interface AvatarProps {
  povArray: {
    avatar: string;
    username: string;
    id: number;
  }[];
  className?: string;
  onClick: () => void;
}

export const Povs: React.FC<AvatarProps> = ({
  povArray,
  className = "",
  onClick,
}) => {
  const [isError, setError] = React.useState(false);

  return (
    <>
      <div
        onClick={onClick}
        className={`bg-gradient-to-r from-secondary-300 to-secondary-200 flex justify-center shadow-md shadow-primary-300 items-center cursor-pointer bg-secondary-300 w-12 h-12 rounded-full`}
      >
        <PlusIcon />
      </div>
      {povArray.map((s, i) => (
        <Link href={`/pov/${s.id}`} passHref key={i + s.username}>
          <div className={`relative inline-block ${className}`}>
            <img
              alt={s ? `${s}-s-avatar` : "your-avatar"}
              className={`shadow-md shadow-primary-300 cursor-pointer bg-primary-400 border-4 border-secondary-300 shadow-outlineSm object-cover w-12 h-12 rounded-full`}
              onError={() => setError(true)}
              src={
                isError
                  ? `https://ui-avatars.com/api/&name=quibi&rounded=true&background=B23439&bold=true&color=FFFFFF`
                  : s.avatar
              }
            />
          </div>
        </Link>
      ))}
    </>
  );
};
