import { useRouter } from "next/router";
import avatar from "../../img/avatar.jpg";
import avatar2 from "../../img/avatar2.jpg";
import avatar3 from "../../img/avatar3.jpg";
import { useTypeSafeTranslation } from "../../hooks/useTypeSafeTranslation";
import { PreviewElement } from "../../ui/PreviewElement";

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
