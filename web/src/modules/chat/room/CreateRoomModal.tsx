import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { InputField } from "../../../form-fields/InputField";
import { useConn, useWrappedConn } from "../../../hooks/useConn";
import { useTypeSafeMutation } from "../../../hooks/useTypeSafeMutation";
import { useTypeSafeUpdateQuery } from "../../../hooks/useTypeSafeUpdateQuery";
import { DoneIcon, HashIcon, OutlineGlobe } from "../../../icons";
import { showErrorToast } from "../../../lib/showErrorToast";
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
  const conn = useWrappedConn();
  const { push } = useRouter();
  const updater = useTypeSafeUpdateQuery();

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
            roomName: "",
            isPrivate: true,
          }}
          validateOnChange={false}
          validateOnBlur={false}
          validate={({ roomName }) => {
            const errors: Record<string, string> = {};

            if (roomName.length < 2 || roomName.length > 60) {
              return {
                roomName: "must be between 2 to 60 characters long",
              };
            }

            return errors;
          }}
          onSubmit={async ({ isPrivate, roomName }) => {
            const d = { roomName, isPrivate };

            const resp = await conn.mutation.createRoom(d);
            console.log(resp);

            if (typeof resp === "object" && "error" in resp) {
              showErrorToast(resp.error, "error");
              return;
            } else if (resp.room) {
              const { room } = resp;

              updater(["getMyRooms"], (r) => {
                if (!r) {
                  return r;
                }

                return {
                  rooms: [
                    ...r.rooms,
                    {
                      ...room,
                    },
                  ],
                };
              });

              push(`/room/[id]`, `/room/${room.id}`);
            }

            onRequestClose();
          }}
        >
          {({ isSubmitting, setFieldValue, values }) => (
            <Form>
              <div className="flex flex-col gap-4 mt-4">
                <InputField
                  name="roomName"
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
