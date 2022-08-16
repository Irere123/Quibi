import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { InputField } from "../../../form-fields/InputField";
import { DoneIcon, HashIcon, OutlineGlobe } from "../../../icons";
import { Button } from "../../../ui/Button";
import { Modal } from "../../../ui/Modal";
import { NativeCheckbox } from "../../../ui/NativeCheckbox";

interface CreateRoomModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

export const CreateRoomModal: React.FC<CreateRoomModalProps> = ({
  isOpen,
  onRequestClose,
}) => {
  const { push } = useRouter();

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      title="Create a room"
      subtitle="Give your new room a personality with a name and online visibility you can always change it later."
    >
      {isOpen ? (
        <Formik
          initialValues={{
            name: "",
            isPrivate: true,
          }}
          validateOnChange={false}
          validateOnBlur={false}
          validate={({ name }) => {
            const errors: Record<string, string> = {};

            if (name.length < 2 || name.length > 60) {
              return {
                name: "must be between 2 to 60 characters long",
              };
            }

            return errors;
          }}
          onSubmit={async (data) => {
            onRequestClose();
          }}
        >
          {({ isSubmitting, setFieldValue, values }) => (
            <Form>
              <div className="flex flex-col gap-4 mt-4">
                <InputField
                  name="name"
                  placeholder="#room-name"
                  maxLength={60}
                  autoFocus
                  autoComplete="off"
                />
                <NativeCheckbox
                  disabled={isSubmitting}
                  checked={values.isPrivate}
                  onClick={() => {
                    setFieldValue("isPrivate", !values.isPrivate);
                  }}
                  subtitle="Only invited members will join"
                  title="Private"
                />
              </div>
              <div className="flex gap-3 mt-4">
                <Button loading={isSubmitting} type="submit" size="medium">
                  Create room
                </Button>
                <Button
                  type="button"
                  color="secondary"
                  onClick={onRequestClose}
                >
                  Cancel
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      ) : null}
    </Modal>
  );
};
