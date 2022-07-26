import React from "react";
import { Friends, VerifiedIcon } from "../../../icons";
import { ModalSmallCard } from "../../../ui/ModalSmallCard";

export const CreateRoomModal: React.FC = () => {
  return (
    <div className="mt-4 space-y-3">
      <ModalSmallCard icon={<Friends />} title={"Create a chat"} />
      <ModalSmallCard icon={<VerifiedIcon />} title={"Create a forum"} />
    </div>
  );
};
