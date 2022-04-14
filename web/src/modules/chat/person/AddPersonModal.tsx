import React from "react";
import { Modal } from "../../../ui/Modal";

interface ModalProps {
  onRequestClose: () => void;
  isOpen: boolean;
}

export const AddPersonModal: React.FC<ModalProps> = ({
  isOpen,
  onRequestClose,
}) => {
  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
      <h1>add person</h1>
    </Modal>
  );
};
