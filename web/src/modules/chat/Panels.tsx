import React, { useState } from "react";
import { useRouter } from "next/router";
import avatar from "../../img/avatar.jpg";
import avatar2 from "../../img/avatar2.jpg";
import avatar3 from "../../img/avatar3.jpg";
import { PreviewElement } from "../../ui/PreviewElement";
import { SingleUser } from "../../ui/UserAvatar";
import { kFormatter } from "../../lib/kFormatter";
import { Button } from "../../ui/Button";
import { BoxedIcon } from "../../ui/BoxedIcon";
import { AccountIcon, SettingsIcon } from "../../icons";
import { AccountModal } from "./person/AccountModal";
import { useTypeSafeTranslation } from "../../hooks/useTypeSafeTranslation";

const groups = [
  {
    id: 1,
    avatar: avatar.src,
    name: "THE CUBS",
    msg: {
      t: "10:10PM",
      text: "Hahahahaha..",
    },
  },
  {
    id: 2,
    avatar: avatar2.src,
    name: "mems-club",
    msg: {
      t: "12:15PM",
      text: "life is fun",
    },
  },
  {
    id: 3,
    avatar: avatar3.src,
    name: "Neox",
    msg: {
      t: "4:00AM",
      text: "ok, sure",
    },
  },
];

const users = [
  {
    id: 1,
    avatar: avatar.src,
    isOnline: false,
    name: "William",
    msg: {
      t: "4:00AM",
      text: "What's up man",
    },
  },
  {
    id: 2,
    isOnline: true,
    avatar: avatar3.src,
    name: "Jackson",
    msg: {
      t: "5:00AM",
      text: "ok, brother",
    },
  },
];

const LeftPanelLayout: React.FC = ({ children }) => {
  return <div className="space-y-3 mt-8">{children}</div>;
};

export const LeftPanel: React.FC = () => {
  return (
    <LeftPanelLayout>
      <Groups groups={groups} />
      <People users={users} />
    </LeftPanelLayout>
  );
};

const Groups: React.FC<{ groups: any }> = ({ groups }) => {
  const { push } = useRouter();
  const { t } = useTypeSafeTranslation();

  return (
    <div className="space-y-3 bg-primary-300 p-3 rounded">
      <p>{t("pages.chat.groups")}</p>
      {groups.map((g: any, idx: number) => (
        <PreviewElement
          avatar={g.avatar}
          name={g.name}
          msg={g.msg}
          key={idx}
          onClick={() => push(`/chat/group/${g.id}`)}
        />
      ))}
    </div>
  );
};

const People: React.FC<{ users: any }> = ({ users }) => {
  const { push } = useRouter();
  const { t } = useTypeSafeTranslation();

  return (
    <div className="bg-primary-300 p-3 rounded">
      <p>{t("pages.chat.people")}</p>
      <div className="space-y-3">
        {users.map((u: any, idx: number) => (
          <PreviewElement
            key={idx}
            avatar={u.avatar}
            isOnline={u.isOnline}
            name={u.name}
            msg={u.msg}
            onClick={() => push(`/chat/dm/${u.id}`)}
          />
        ))}
      </div>
    </div>
  );
};

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
