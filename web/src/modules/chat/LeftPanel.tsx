import Link from "next/link";
import { BoxedIcon } from "../../ui/BoxedIcon";
import { PlusIcon } from "../../icons";

import { useState } from "react";
import { CreateRoomModal } from "./room/CreateRoomModal";
import { RoomAvatar } from "../../ui/Avatars";

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

  return (
    <div className="flex flex-col items-center gap-5 cursor-pointer overflow-y-auto">
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
