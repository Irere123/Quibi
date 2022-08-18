import React from "react";
import avatar from "../../../../img/avatar2.jpg";
import avatar2 from "../../../../img/avatar.jpg";
import { MessageElement } from "../../../../ui/MessageElement";
import { useTypeSafeQuery } from "../../../../hooks/useTypeSafeQuery";
import { isServer } from "../../../../lib/isServer";
import { useRoomChatStore } from "./useRoomChatStore";

interface RoomMessagesProps {
  room: any;
}

export const RoomMessages: React.FC<RoomMessagesProps> = ({ room }) => {
  const { data, isLoading } = useTypeSafeQuery(
    ["getRoomMessages", room.id],
    {
      enabled: !isServer,
    },
    [room.id]
  );

  if (isLoading) {
    return <>loading...</>;
  }

  return (
    <div className="flex flex-col px-5 flex-1 justify-end overflow-y-scroll scrollbar-thin scrollbar-thumb-rounded-xl scrollbar-thumb-primary-700">
      {data.messages.map((m: any) => (
        <MessageElement
          key={m.id}
          msg={{ text: m.message, dt: m.inserted_at }}
          user={{
            avatar: m.creator.avatarUrl,
            username: m.creator.username,
            isOnline: m.creator.online,
          }}
        />
      ))}
    </div>
  );
};
