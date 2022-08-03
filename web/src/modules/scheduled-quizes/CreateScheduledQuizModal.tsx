import { Form, Formik } from "formik";
import React from "react";
import { InputField } from "../../form-fields/InputField";
import { Modal } from "../../ui/Modal";

interface CreateScheduledQuizModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

export const CreateScheduledQuizModal: React.FC<
  CreateScheduledQuizModalProps
> = ({ isOpen, onRequestClose }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      title={`Schedule a Quiz`}
    >
      {isOpen ? (
        <Formik
          initialValues={{ title: "", description: "" }}
          onSubmit={() => {}}
        >
          {() => (
            <Form>
              <InputField name="title" />
            </Form>
          )}
        </Formik>
      ) : null}
    </Modal>
  );
};
