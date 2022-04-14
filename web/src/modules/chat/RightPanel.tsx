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
  let isGroup = pathname.includes("/chat/group");
  let isHome = pathname === "/chat";
  let isDm = pathname.includes("/chat/dm");

  return (
    <div className="flex flex-col py-5">
      {isGroup && <RightPanelGroup />}
      {isDm && <RightPanelPerson />}
      {isHome && <RightPanelGroup />}
    </div>
  );
};

const RightPanelGroup: React.FC = () => {
  const { query } = useRouter();
  const { t } = useTypeSafeTranslation();
  const groupId = query.id;

  return (
    <div className="flex flex-col justify-center items-center">
      <SingleUser src={avatar.src} />
      <p>Group#{groupId}</p>
      <div className="flex flex-col items-center">
        <p>{t("pages.chat.members", { membersNum: kFormatter(1500000000) })}</p>
        <Button>{t("pages.chat.add_members")}</Button>
      </div>
    </div>
  );
};

const RightPanelPerson: React.FC = () => {
  const [openAccount, setOpenAccount] = useState<boolean>(false);
  const { query } = useRouter();
  const { t } = useTypeSafeTranslation();
  const personId = query.id;

  return (
    <div className="flex flex-col justify-center items-center">
      <SingleUser src={avatar.src} />
      <p>Person#{personId}</p>
      <div>
        <p>{t("pages.chat.messages", { messageNum: kFormatter(5000) })}</p>
        <div className="flex flex-1 justify-center gap-3">
          <BoxedIcon shadow>
            <SettingsIcon />
          </BoxedIcon>
          <BoxedIcon shadow onClick={() => setOpenAccount(!openAccount)}>
            <AccountIcon />
          </BoxedIcon>
        </div>
      </div>
      {openAccount && (
        <AccountModal
          isOpen={openAccount}
          onRequestClose={() => setOpenAccount(!openAccount)}
        />
      )}
    </div>
  );
};
