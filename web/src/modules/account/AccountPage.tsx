import React from "react";
import { useTypeSafeTranslation } from "../../hooks/useTypeSafeTranslation";
import { HeaderController } from "../components/HeaderController";
import { AccountLayout } from "./AccountLayout";

export const AccountPage: React.FC = () => {
  const { t } = useTypeSafeTranslation();

  return (
    <>
      <HeaderController
        title={t("components.panels.right.account")}
        embed={{}}
      />
      <AccountLayout>
        <h1>Hello profile</h1>
      </AccountLayout>
    </>
  );
};
