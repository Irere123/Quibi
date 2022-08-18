import React, { useState } from "react";
import { MultipleUsers } from "../../../../ui/Avatars";
import avatar from "../../../../img/avatar.jpg";
import avatar2 from "../../../../img/avatar2.jpg";
import avatar3 from "../../../../img/avatar3.jpg";
import { MembersModal } from "../MembersModals";
import { HashIcon } from "../../../../icons";

interface RoomChatHeaderProps {
  room: any;
}

export const RoomChatHeader: React.FC<RoomChatHeaderProps> = ({ room }) => {
  const [openMembersModal, setOpenMembersModal] = useState(false);

  return (
    <div className="flex p-3 border-b-2 border-primary-700">
      <div className="flex flex-1">
        <div className="flex gap-2 items-center text-primary-100">
          <span>
            <HashIcon />
          </span>
          <p>{room.name}</p>
        </div>
      </div>
      <div className="flex gap-2 items-center">
        <span onClick={() => setOpenMembersModal(!openMembersModal)}>
          <MultipleUsers srcArray={[avatar.src, avatar2.src, avatar3.src]} />
        </span>
      </div>
      {openMembersModal && (
        <MembersModal
          isOpen={openMembersModal}
          onRequestClose={() => setOpenMembersModal(!openMembersModal)}
        />
      )}
    </div>
  );
};
