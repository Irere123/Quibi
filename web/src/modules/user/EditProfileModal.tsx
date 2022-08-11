import { Form, Formik } from "formik";
import React from "react";
import { object, pattern, size, string } from "superstruct";
import { InputField } from "../../form-fields/InputField";
import { useMeQuery } from "../../hooks/useMeQuery";
import { useTypeSafeMutation } from "../../hooks/useTypeSafeMutation";
import { useTypeSafeTranslation } from "../../hooks/useTypeSafeTranslation";
import { useTypeSafeUpdateQuery } from "../../hooks/useTypeSafeUpdateQuery";
import { validateStruct } from "../../lib/validateStruct";
import { Button } from "../../ui/Button";
import { ButtonLink } from "../../ui/ButtonLink";
import { Modal } from "../../ui/Modal";
import { auth_query } from "../ws/createWebSocket";

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
  const { me } = useMeQuery();
  const { t } = useTypeSafeTranslation();
  const { mutateAsync, isLoading } = useTypeSafeMutation();
  const update = useTypeSafeUpdateQuery();

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      title={`Edit profile`}
    >
      {isOpen ? (
        <Formik
          initialValues={{
            displayName: me?.displayName!,
            username: me?.username!,
            bio: me?.bio || "",
          }}
          validateOnChange={false}
          validate={(values) => {
            return validateFn({
              ...values,
              displayName: values.displayName.trim(),
            });
          }}
          onSubmit={async (data) => {
            const resp = await mutateAsync({
              d: { data },
              op: "edit_profile",
            });

            update(auth_query, (x) =>
              !x
                ? x
                : {
                    ...x,
                    user: {
                      ...x.user,
                      ...data,
                    },
                  }
            );
            onEdit?.(data);
            onRequestClose();
          }}
        >
          {({ isSubmitting }) => (
            <Form className={`flex-col w-full`}>
              <InputField
                className="mb-4"
                errorMsg="the name must have at least 2 characters"
                label="Display name"
                name="displayName"
                maxLength={50}
              />
              <InputField
                className="mb-4"
                errorMsg="the bio must have at least 5 characters"
                label="About"
                name="bio"
                textarea={true}
                rows={5}
                maxLength={200}
              />
              <div className={`flex pt-2 items-center`}>
                <Button
                  loading={isLoading}
                  type="submit"
                  className={`mr-3`}
                  size="medium"
                  disabled={isSubmitting}
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
