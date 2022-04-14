import React from "react";
import { Modal } from "../../../ui/Modal";

interface MembersModalProps {
  onRequestClose: () => void;
  isOpen: boolean;
}

export const MembersModal: React.FC<MembersModalProps> = ({
  isOpen,
  onRequestClose,
}) => {
  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
      <h1>Modal members</h1>
    </Modal>
  );
};
