import { useRouter } from "next/router";
import React from "react";
import { useConn } from "../hooks/useConn";
import { PlusIcon } from "../icons";
import { BoxedIcon } from "./BoxedIcon";
import { SingleUser } from "./Avatars";

interface AccountPageHeaderProps {
  title: string;
  icon: React.ReactNode;
  children?: React.ReactNode;
}

export const AccountPageHeader: React.FC<AccountPageHeaderProps> = ({
  icon,
  title,
  children,
}) => {
  const conn = useConn();
  const { push } = useRouter();
  return (
    <div className="flex w-full items-center">
      <div className="flex flex-1 px-4">
        <div className="flex gap-3">
          <BoxedIcon className="text-secondary-300">{icon}</BoxedIcon>
          <h4 className="text-primary-100">{title}</h4>
        </div>
        {children}
      </div>
      <div className="flex gap-3">
        <BoxedIcon circle onClick={() => push("/dash")}>
          <PlusIcon className="transform rotate-45" />
        </BoxedIcon>
        <SingleUser src={conn.user.avatarUrl} size="md" />
      </div>
    </div>
  );
};
