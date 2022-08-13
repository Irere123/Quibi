import Link from "next/link";
import { BoxedIcon } from "../../ui/BoxedIcon";
import { CompassIcon, PlusIcon } from "../../icons";

import { useState } from "react";
import { CreateRoomModal } from "./room/CreateRoomModal";
import { RoomAvatar } from "../../ui/Avatars";
import { useRouter } from "next/router";

const rooms = [
  {
    id: "232skjds",
    name: "hello",
    isForum: true,
  },
  {
    id: "232skjds",
    name: "world",
    isForum: true,
  },
];

export const LeftPanel: React.FC = () => {
  const [createRoomModal, setCreateRoomModal] = useState<boolean>(false);
  const { push } = useRouter();

  return (
    <div className="flex flex-col  items-center gap-3 cursor-pointer overflow-y-auto">
      <div className="space-y-3">
        <BoxedIcon circle onClick={() => push("/explore-rooms")}>
          <CompassIcon />
        </BoxedIcon>

        <BoxedIcon circle onClick={() => setCreateRoomModal(!createRoomModal)}>
          <PlusIcon />
        </BoxedIcon>
      </div>
      {rooms.map((room: any) => {
        if (room.isForum) {
          return (
            <Link href={`/room/f/${room.id}/${room.id}`} key={room.id}>
              <a>
                <RoomAvatar name={room.name} size="sm" />
              </a>
            </Link>
          );
        }

        return (
          <Link href={`/room/${room.id}/${room.id}`} key={room.id}>
            <a>
              <RoomAvatar name={room.name} size="sm" isOnline />
            </a>
          </Link>
        );
      })}

      {createRoomModal && (
        <CreateRoomModal
          isOpen={createRoomModal}
          onRequestClose={() => setCreateRoomModal(!createRoomModal)}
        />
      )}
    </div>
  );
};
