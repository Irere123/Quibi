import { Formik } from "formik";
import React from "react";
import { InputField } from "../../form-fields/InputField";
import { Modal } from "../../ui/Modal";

interface CreateQuizModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

export const CreateQuizModal: React.FC<CreateQuizModalProps> = ({
  isOpen,
  onRequestClose,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      title={`Create a Quiz`}
    >
      {isOpen ? (
        <Formik
          initialValues={{ title: "", description: "", privacy: "" }}
          onSubmit={() => {}}
        >
          {() => (
            <div>
              <InputField
                name="title"
                label="Title"
                placeholder="Your quiz title"
              />
            </div>
          )}
        </Formik>
      ) : null}
    </Modal>
  );
};
