import React from "react";
import { HandIcon, New } from "../../icons";
import { ModalSmallCard } from "../../ui/ModalSmallCard";

export const CreateQuizModal: React.FC = () => {
  return (
    <div className="space-y-3 mt-3">
      <ModalSmallCard
        icon={<HandIcon />}
        title="Live Quiz"
        onClick={() => alert("live")}
      />
      <ModalSmallCard
        icon={<New />}
        title="Normal Quiz"
        onClick={() => alert("normal")}
      />
    </div>
  );
};
