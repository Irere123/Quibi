import React, { useState } from "react";
import { useRouter } from "next/router";
import avatar from "../../img/avatar.jpg";
import { SingleUser } from "../../ui/UserAvatar";
import { kFormatter } from "../../lib/kFormatter";
import { Button } from "../../ui/Button";
import { useTypeSafeTranslation } from "../../hooks/useTypeSafeTranslation";
import { AccountModal } from "./person/AccountModal";
import { AccountIcon, SettingsIcon } from "../../icons";
import { BoxedIcon } from "../../ui/BoxedIcon";

export const RightPanel: React.FC = () => {
  const { pathname } = useRouter();
  const { t } = useTypeSafeTranslation();
  const { query } = useRouter();
  const groupId = query.id;

  return (
    <div className="flex flex-col py-5">
      <div className="flex flex-col justify-center items-center">
        <SingleUser src={avatar.src} />
      </div>
    </div>
  );
};
