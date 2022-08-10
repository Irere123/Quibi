import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import React from "react";
import { InputField } from "../../form-fields/InputField";
import { useTypeSafeTranslation } from "../../hooks/useTypeSafeTranslation";
import { Button } from "../../ui/Button";
import { ButtonLink } from "../../ui/ButtonLink";
import { Modal } from "../../ui/Modal";
import { NativeSelect } from "../../ui/NativeSelect";

interface CreateQuizModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

export const CreateQuizModal: React.FC<CreateQuizModalProps> = ({
  isOpen,
  onRequestClose,
}) => {
  const { push } = useRouter();
  const { t } = useTypeSafeTranslation();

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      title={`Create a Quiz`}
    >
      {isOpen ? (
        <Formik<{
          name: string;
          privacy: string;
          description: string;
        }>
          initialValues={{ name: "", description: "", privacy: "public" }}
          validateOnChange={false}
          onSubmit={async ({ name, privacy, description }) => {
            onRequestClose();
          }}
        >
          {({ isSubmitting, values, setFieldValue }) => (
            <Form>
              <InputField
                name="name"
                placeholder="Quiz title"
                autoComplete="off"
                maxLength={70}
                autoFocus
              />

              <InputField
                textarea
                name="description"
                placeholder="Quiz description"
                autoComplete="off"
                maxLength={200}
                className={`mt-4`}
                rows={4}
              />
              <div className={`grid items-start grid-cols-1 h-6`}>
                <NativeSelect
                  value={values.privacy}
                  onChange={(e) => {
                    setFieldValue("privacy", e.target.value);
                  }}
                >
                  <option value="public" className={`hover:bg-primary-900`}>
                    public
                  </option>
                  <option value="private" className={`hover:bg-primary-900`}>
                    private
                  </option>
                </NativeSelect>
              </div>
              <div className={`flex pt-4 space-x-3 col-span-full items-center`}>
                <Button
                  loading={isSubmitting}
                  type="submit"
                  size="medium"
                  className={`mr-3`}
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
