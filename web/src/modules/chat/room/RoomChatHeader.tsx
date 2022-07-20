import React from "react";
import { useModalStore } from "../../../stores/useModalStore";
import { CommandIcon, HashIcon } from "../../../icons";
import { MultipleUsers } from "../../../ui/UserAvatar";
import avatar from "../../../img/avatar.jpg";
import avatar2 from "../../../img/avatar2.jpg";
import avatar3 from "../../../img/avatar3.jpg";
import { MembersModal } from "./MembersModals";

export const RoomChatHeader: React.FC = () => {
  const { openMembersModal, setOpenMembersModal } = useModalStore();

  return (
    <div className="flex p-3 border-b-2 border-primary-700">
      <div className="flex flex-1">
        <p className="text-primary-100">Neox Group</p>
      </div>
      <div className="flex gap-2 items-center">
        <span className="cursor-pointer fill-current text-primary-200">
          <HashIcon />
        </span>
        <span className="cursor-pointer fill-current text-primary-200">
          <CommandIcon />
        </span>
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
