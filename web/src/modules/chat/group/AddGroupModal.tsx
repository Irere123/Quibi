import React from "react";
import { Modal } from "../../../ui/Modal";

interface ModalProps {
  onRequestClose: () => void;
  isOpen: boolean;
}

export const AddGroupModal: React.FC<ModalProps> = ({
  isOpen,
  onRequestClose,
}) => {
  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
      <h1>add group</h1>
    </Modal>
  );
};
