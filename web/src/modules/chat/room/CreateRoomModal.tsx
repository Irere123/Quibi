import { Form, Formik } from "formik";
import React, { useState } from "react";
import { object, size, string } from "superstruct";
import { DoneIcon, HashIcon, OutlineGlobe } from "../../../icons";
import { validateStruct } from "../../../lib/validateStruct";
import { Button } from "../../../ui/Button";
import { Input } from "../../../ui/Input";
import { Modal } from "../../../ui/Modal";

const roomStruct = object({
  name: size(string(), 2, 15),
});

const validateFn = validateStruct(roomStruct);

interface CreateRoomModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

export const CreateRoomModal: React.FC<CreateRoomModalProps> = ({
  isOpen,
  onRequestClose,
}) => {
  const [isForum, setIsForum] = useState(false);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      title="Create a room"
    >
      <Formik
        initialValues={{
          name: "",
          isPrivate: true,
          isForum: false,
        }}
        validateOnChange={false}
        validate={(values) => {
          return validateFn({ ...values });
        }}
        onSubmit={() => {
          console.log("submitted");
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="flex flex-col mb-5">
              <div className="flex flex-col gap-2">
                <p className="text-primary-300 font-light text-sm uppercase">
                  room type
                </p>
                <div
                  onClick={() => setIsForum(false)}
                  className={`flex gap-3 text-primary-100 items-center cursor-pointer px-3 py-1 ${
                    !isForum ? "bg-primary-600" : "bg-primary-700"
                  } rounded`}
                >
                  {!isForum ? (
                    <span>
                      <DoneIcon width={24} height={24} />
                    </span>
                  ) : (
                    <span>
                      <HashIcon />
                    </span>
                  )}
                  <span className="m-0">
                    <p className="text-primary-200">Text Room</p>
                    <p className="text-sm text-primary-300">
                      Send messages, emoji and puns
                    </p>
                  </span>
                </div>
                <div
                  onClick={() => setIsForum(true)}
                  className={`flex gap-3 text-primary-100 items-center cursor-pointer px-3 py-1 ${
                    !isForum ? "bg-primary-700" : "bg-primary-600"
                  } rounded`}
                >
                  {isForum ? (
                    <span>
                      <DoneIcon width={24} height={24} />
                    </span>
                  ) : (
                    <span>
                      <OutlineGlobe />
                    </span>
                  )}
                  <span className="m-0">
                    <p className="text-primary-200">Forum Room</p>
                    <p className="text-sm text-primary-300">
                      Discussion on topics and share opionions
                    </p>
                  </span>
                </div>
                <p className="text-primary-300 font-light text-sm uppercase">
                  room name
                </p>
                <div>
                  <Input
                    placeholder="new-room"
                    name="name"
                    autoComplete="off"
                    className="border-2 border-primary-700"
                  />
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <Button
                loading={isSubmitting}
                type="submit"
                onClick={() => console.log("created")}
                size="medium"
              >
                Create Room
              </Button>
              <Button type="button" color="secondary" onClick={onRequestClose}>
                Cancel
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};
