import React, { useState } from "react";
import Link from "next/link";
import { BoxedIcon } from "../../ui/BoxedIcon";
import { CompassIcon, PlusIcon } from "../../icons";
import { CreateRoomModal } from "./room/CreateRoomModal";
import { RoomAvatar } from "../../ui/Avatars";
import { useRouter } from "next/router";
import { useTypeSafeQuery } from "../../hooks/useTypeSafeQuery";

export const LeftPanel: React.FC = () => {
  const { data, isLoading } = useTypeSafeQuery(["getMyRooms"]);
  const [createRoomModal, setCreateRoomModal] = useState<boolean>(false);
  const { push } = useRouter();

  if (isLoading) {
    return (
      <div className="flex flex-col items-center gap-3 cursor-pointer">
        <div className="space-y-3">
          <BoxedIcon circle onClick={() => push("/explore-rooms")}>
            <CompassIcon />
          </BoxedIcon>

          <BoxedIcon
            circle
            onClick={() => setCreateRoomModal(!createRoomModal)}
          >
            <PlusIcon />
          </BoxedIcon>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-3 cursor-pointer">
      <div className="space-y-3">
        <BoxedIcon circle onClick={() => push("/explore-rooms")}>
          <CompassIcon />
        </BoxedIcon>

        <BoxedIcon circle onClick={() => setCreateRoomModal(!createRoomModal)}>
          <PlusIcon />
        </BoxedIcon>
      </div>
      {data.rooms.map((room: any) => (
        <Link href={`/room/${room.id}`} key={room.id}>
          <a>
            <RoomAvatar name={room.name} size="sm" isOnline />
          </a>
        </Link>
      ))}

      {createRoomModal && (
        <CreateRoomModal
          isOpen={createRoomModal}
          onRequestClose={() => setCreateRoomModal(!createRoomModal)}
        />
      )}
    </div>
  );
};
