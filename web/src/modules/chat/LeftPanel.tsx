import Link from "next/link";
import avatar from "../../img/avatar.jpg";
import avatar2 from "../../img/avatar2.jpg";
import avatar3 from "../../img/avatar3.jpg";
import { BoxedIcon } from "../../ui/BoxedIcon";
import { PlusIcon } from "../../icons";

import { SingleUser } from "../../ui/UserAvatar";
import { useState } from "react";
import { CreateRoomModal } from "./room/CreateRoomModal";

const rooms = [
  {
    id: 1,
    rid: 23,
    avatarUrl: avatar.src,
    name: "Kenny",
    dm: true,
  },
  {
    id: 2,
    rid: 32,
    avatarUrl: avatar2.src,
    forum: true,
  },
  {
    id: 3,
    rid: 234,
    avatarUrl: avatar3.src,
  },
];

export const LeftPanel: React.FC = () => {
  const [createRoomModal, setCreateRoomModal] = useState<boolean>(false);

  return (
    <div className="flex flex-col items-center gap-5 cursor-pointer ">
      {rooms.map((r, idx: number) => {
        if (r.dm) {
          return (
            <Link href={`/chat/dm/${r.id}/`} key={idx}>
              <a>
                <SingleUser
                  src={r.avatarUrl}
                  size="sm"
                  outline
                  isOnline={true}
                />
              </a>
            </Link>
          );
        } else if (r.forum) {
          return (
            <Link href={`/chat/f/${r.id}/${r.rid}`} key={idx}>
              <a>
                <SingleUser src={r.avatarUrl} size="sm" outline />
              </a>
            </Link>
          );
        }

        return (
          <Link href={`/chat/r/${r.id}/${r.rid}`} key={idx}>
            <a>
              <SingleUser src={r.avatarUrl} size="sm" outline />
            </a>
          </Link>
        );
      })}
      <div onClick={() => setCreateRoomModal(!createRoomModal)}>
        <BoxedIcon circle>
          <PlusIcon />
        </BoxedIcon>
      </div>
      {createRoomModal && (
        <CreateRoomModal
          isOpen={createRoomModal}
          onRequestClose={() => setCreateRoomModal(!createRoomModal)}
        />
      )}
    </div>
  );
};
