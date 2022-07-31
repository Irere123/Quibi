import { Form, Formik } from "formik";
import React, { useContext } from "react";
import { object, pattern, size, string } from "superstruct";
import { InputField } from "../../form-fields/InputField";
import { useTypeSafeTranslation } from "../../hooks/useTypeSafeTranslation";
import { validateStruct } from "../../lib/validateStruct";
import { Button } from "../../ui/Button";
import { ButtonLink } from "../../ui/ButtonLink";
import { Modal } from "../../ui/Modal";
import { WebSocketContext } from "../ws/WebSocketProvider";

const profileStruct = object({
  username: pattern(string(), /^(\w){4,15}$/),
  displayName: size(string(), 2, 50),
  bio: size(string(), 0, 180),
});

interface EditProfileModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  onEdit?: (data: {
    displayName: string;
    username: string;
    bio: string;
  }) => void;
}

const validateFn = validateStruct(profileStruct);

export const EditProfileModal: React.FC<EditProfileModalProps> = ({
  isOpen,
  onRequestClose,
  onEdit,
}) => {
  const { conn, setUser } = useContext(WebSocketContext);
  const { t } = useTypeSafeTranslation();

  if (!conn) {
    return null;
  }

  const { user } = conn;

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      title={`Edit profile`}
    >
      {isOpen ? (
        <Formik
          initialValues={{
            displayName: user.displayName,
            username: user.username,
            bio: user.bio || "",
          }}
          validateOnChange={false}
          validate={(values) => {
            return validateFn({
              ...values,
              displayName: values.displayName.trim(),
            });
          }}
          onSubmit={async (data) => {
            if (conn) {
              setUser({
                ...conn?.user,
                ...data,
                bio: data.bio.trim(),
                displayName: data.displayName.trim(),
              });
            }
            onEdit?.(data);
            onRequestClose();
          }}
        >
          {({ isSubmitting }) => (
            <Form className={`flex-col w-full`}>
              <InputField
                className="mb-4"
                errorMsg="There is an error with your display name"
                label="Display name"
                name="displayName"
              />
              <InputField
                className="mb-4"
                errorMsg="There is an error with your bio"
                label="About"
                name="bio"
                textarea={true}
                rows={5}
              />
              <div className={`flex pt-2 items-center`}>
                <Button
                  loading={isSubmitting}
                  type="submit"
                  className={`mr-3`}
                  size="medium"
                >
                  {t("common.save")}
                </Button>
                <ButtonLink type="button" onClick={onRequestClose}>
                  {t("common.cancel")}
                </ButtonLink>
              </div>
            </Form>
          )}
        </Formik>
      ) : null}
    </Modal>
  );
};
