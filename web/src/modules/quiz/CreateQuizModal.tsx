import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import React from "react";
import { InputField } from "../../form-fields/InputField";
import { useWrappedConn } from "../../hooks/useConn";
import { useTypeSafePrefetch } from "../../hooks/useTypeSafePrefetch";
import { useTypeSafeTranslation } from "../../hooks/useTypeSafeTranslation";
import { showErrorToast } from "../../lib/showErrorToast";
import { useCurrentQuizIdStore } from "../../stores/useCurentQuizIdStore";
import { Button } from "../../ui/Button";
import { ButtonLink } from "../../ui/ButtonLink";
import { Modal } from "../../ui/Modal";
import { NativeSelect } from "../../ui/NativeSelect";
import { useQuizChatStore } from "./chat/useQuizChatStore";

interface CreateQuizModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

export const CreateQuizModal: React.FC<CreateQuizModalProps> = ({
  isOpen,
  onRequestClose,
}) => {
  const conn = useWrappedConn();
  const { push } = useRouter();
  const { t } = useTypeSafeTranslation();
  const prefetch = useTypeSafePrefetch();

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
            const d = { name, privacy, description };

            const resp = await conn.mutation.createQuiz(d);

            if (typeof resp === "object" && "error" in resp) {
              showErrorToast(resp.error);
              return;
            } else if (resp.quiz) {
              const { quiz } = resp;
              prefetch(["joinQuizAndGetInfo", quiz.id], [quiz.id]);
              useQuizChatStore.getState().clearChat();
              useCurrentQuizIdStore.getState().setCurrentQuizId(quiz.id);
              push(`/quiz/[id]`, `/quiz/${resp?.quiz.id}`);
            }

            onRequestClose();
          }}
        >
          {({ isSubmitting, values, setFieldValue }) => (
            <Form
              className={`grid grid-cols-3 gap-4 focus:outline-none w-full`}
            >
              <div className={`flex h-full w-full col-span-2`}>
                <InputField
                  name="name"
                  placeholder={t("modals.createQuizModal.quizName")}
                  autoComplete="off"
                  maxLength={70}
                  autoFocus
                />
              </div>

              <div className={`grid items-start grid-cols-1 h-6`}>
                <NativeSelect
                  value={values.privacy}
                  onChange={(e) => {
                    setFieldValue("privacy", e.target.value);
                  }}
                >
                  <option value="public" className={`hover:bg-primary-900`}>
                    {t("modals.createQuizModal.public")}
                  </option>
                  <option value="private" className={`hover:bg-primary-900`}>
                    {t("modals.createQuizModal.private")}
                  </option>
                </NativeSelect>
              </div>
              <div className={`flex col-span-3 bg-primary-700 rounded-lg`}>
                <InputField
                  textarea
                  name="description"
                  placeholder={t("modals.createQuizModal.quizDescription")}
                  autoComplete="off"
                  maxLength={200}
                  className={`mt-4`}
                  rows={4}
                />
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
