import React from "react";
import { Router } from "next/router";
import create from "zustand";
import { combine } from "zustand/middleware";
import { useSoundEffectStore } from "../modules/sound-effects/useSoundEffectStore";
import { useTypeSafeTranslation } from "../hooks/useTypeSafeTranslation";
import { Button } from "../ui/Button";
import { ButtonLink } from "../ui/ButtonLink";
import { Modal } from "../ui/Modal";
import { SingleUser } from "../ui/Avatars";

interface Props {}

type Fn = () => void;

export type JoinQuizModalType = "invite" | "someone_you_follow_created_a_quiz";

export type UserPreviewInfo = {
  username: string;
  displayName: string;
  avatarUrl: string;
};

type Options = {
  type: JoinQuizModalType;
  quizId: string;
  quizName: string;
  onConfirm: Fn;
} & UserPreviewInfo;

const useConfirmModalStore = create(
  combine(
    {
      options: null as null | Options,
    },
    (set) => ({
      close: () => set({ options: null }),
      set,
    })
  )
);

export const invitedToQuizConfirm = (
  options: Omit<Options, "onConfirm">,
  push: Router["push"]
) => {
  useSoundEffectStore.getState().playSoundEffect("quizInvite");
  useConfirmModalStore.getState().set({
    options: {
      ...options,
      onConfirm: () => {
        push(`/quiz/[id]`, `/quiz/${options.quizId}`);
      },
    },
  });
};

export const InvitedToJoinQuizModal: React.FC<Props> = () => {
  const { options, close } = useConfirmModalStore();
  const { t } = useTypeSafeTranslation();
  return (
    <Modal
      isOpen={!!options}
      onRequestClose={() => close()}
      title={
        options?.type === "someone_you_follow_created_a_quiz"
          ? t("modals.invitedToJoinQuizModal.QuizInviteFrom")
          : t("modals.invitedToJoinQuizModal.QuizInviteFrom")
      }
    >
      <div className="flex flex-col">
        {options ? (
          <div className="flex flex-col text-primary-100">
            <div className={`flex items-center`}>
              <SingleUser size="md" src={options.avatarUrl} />
              <div className={`flex ml-2 flex-col`}>
                <div className={`flex font-bold`}>{options.displayName}</div>
                <div className={`flex my-1 flex`}>
                  <div className="flex">@{options.username}</div>
                </div>
              </div>
            </div>
            <div className={`mt-4`}>
              {options.type === "someone_you_follow_created_a_quiz"
                ? t("modals.invitedToJoinQuizModal.justStarted")
                : t("modals.invitedToJoinQuizModal.inviteReceived")}{" "}
              <span className={`font-semibold ml-1`}>{options.quizName}</span>
              {t("modals.invitedToJoinQuizModal.likeToJoin")}
            </div>
          </div>
        ) : null}
        <div className={`flex mt-4 items-center`}>
          <Button
            onClick={() => {
              close();
              options?.onConfirm();
            }}
            type="submit"
          >
            {t("common.yes")}
          </Button>
          <ButtonLink
            type="button"
            onClick={close}
            className={`ml-4`}
            color="secondary"
          >
            {t("common.cancel")}
          </ButtonLink>
        </div>
      </div>
    </Modal>
  );
};
