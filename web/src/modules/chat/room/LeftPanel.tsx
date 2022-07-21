import avatar from "../../../img/avatar.jpg";
import avatar2 from "../../../img/avatar2.jpg";
import avatar3 from "../../../img/avatar3.jpg";
import { BoxedIcon } from "../../../ui/BoxedIcon";
import { PlusIcon } from "../../../icons";

import { SingleUser } from "../../../ui/UserAvatar";

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

export const LeftPanel: React.FC = () => {
  return (
    <div className="flex flex-col items-center gap-5 cursor-pointer ">
      {groups.map((u: any, idx: number) => (
        <SingleUser key={idx + u.name} src={u.avatar} size="sm" outline />
      ))}
      <BoxedIcon circle>
        <PlusIcon />
      </BoxedIcon>
    </div>
  );
};
