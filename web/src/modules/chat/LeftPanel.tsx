import Link from "next/link";
import { BoxedIcon } from "../../ui/BoxedIcon";
import { PlusIcon } from "../../icons";

import { SingleUser } from "../../ui/Avatars";
import { useState } from "react";
import { CreateRoomModal } from "./room/CreateRoomModal";
import { useConn } from "../../hooks/useConn";

export const LeftPanel: React.FC = () => {
  const { rooms } = useConn();
  const [createRoomModal, setCreateRoomModal] = useState<boolean>(false);

  return (
    <div className="flex flex-col items-center gap-5 cursor-pointer overflow-y-auto mb-3">
      {rooms.map((room: any, idx: number) => {
        if (room.isForum) {
          return (
            <Link href={`/room/f/${room.id}/${room.id}`} key={room.id}>
              <a>
                <SingleUser
                  src={room.avatarUrl}
                  username={room.name}
                  size="sm"
                />
              </a>
            </Link>
          );
        }

        return (
          <Link href={`/room/${room.id}/${room.id}`} key={room.id}>
            <a>
              <SingleUser src={room.avatarUrl} size="sm" />
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
