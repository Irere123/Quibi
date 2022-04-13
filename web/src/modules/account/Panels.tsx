import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";

const activeClassname = "bg-primary-300 p-2 rounded";

export const LeftPanel: React.FC = () => {
  const { pathname } = useRouter();
  const isActive = (link: string) => {
    if (pathname === link) {
      return true;
    }
    return false;
  };
  return (
    <div className="flex flex-col gap-3 mt-7">
      <Link href={"/account"} passHref>
        <div
          className={`cursor-pointer ${
            isActive("/account") ? activeClassname : ""
          }`}
        >
          <p>Profile</p>
        </div>
      </Link>
      <Link href={"/account/marks"} passHref>
        <div
          className={`cursor-pointer ${
            isActive("/account/marks") ? activeClassname : ""
          }`}
        >
          <p>Marks</p>
        </div>
      </Link>
      <Link href={"/account/discipline"} passHref>
        <div
          className={`cursor-pointer ${
            isActive("/account/discipline") ? activeClassname : ""
          }`}
        >
          <p>Discipline</p>
        </div>
      </Link>
    </div>
  );
};
