import React from "react";
import { Modal } from "../../../ui/Modal";

interface AccountModalProps {
  onRequestClose: () => void;
  isOpen: boolean;
}

export const AccountModal: React.FC<AccountModalProps> = ({
  isOpen,
  onRequestClose,
}) => {
  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
      <div>
        <p>Hello world</p>
      </div>
    </Modal>
  );
};
