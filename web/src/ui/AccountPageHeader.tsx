import { useRouter } from "next/router";
import React from "react";
import { useConn } from "../hooks/useConn";
import { LogOutIcon, PlusIcon } from "../icons";
import { useTokenStore } from "../modules/auth/useTokenStore";
import { BoxedIcon } from "./BoxedIcon";
import { modalConfirm } from "../shared-components/ConfirmModal";

interface AccountPageHeaderProps {
  title: string;
  icon: React.ReactNode;
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
        <BoxedIcon
          circle
          onClick={() => {
            modalConfirm("Are you sure you want to logout", () => {
              conn.close();
              useTokenStore.getState().setTokens({
                accessToken: "",
                refreshToken: "",
              });

              push("/logout");
            });
          }}
        >
          <LogOutIcon />
        </BoxedIcon>
      </div>
    </div>
  );
};
