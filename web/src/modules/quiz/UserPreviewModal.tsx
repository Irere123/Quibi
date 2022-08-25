import React, { useContext } from "react";
import { useConn } from "../../hooks/useConn";
import { useCurrentQuizInfo } from "../../hooks/useCurrentQuizInfo";
import { useTypeSafeMutation } from "../../hooks/useTypeSafeMutation";
import { useTypeSafeQuery } from "../../hooks/useTypeSafeQuery";
import { Button } from "../../ui/Button";
import { Modal } from "../../ui/Modal";
import { Spinner } from "../../ui/Spinner";
import { VerticalUserInfo } from "../../ui/VerticalUserInfo";
import { VerticalUserInfoWithFollowButton } from "../user/VerticalUserInfoWithFollowButton";
import { JoinQuizAndGetInfoResponse, QuizUser } from "../ws";
import { QuizChatMessage, useQuizChatStore } from "./chat/useQuizChatStore";
import { UserPreviewModalContext } from "./UserPreviewModalProvider";

const UserPreview: React.FC<{
  id: string;
  message?: QuizChatMessage;
  quizPermissions?: QuizUser["quizPermissions"];
  isMe: boolean;
  iAmCreator: boolean;
  iAmMod: boolean;
  isCreator: boolean;
  onClose: () => void;
}> = ({
  iAmCreator,
  id,
  isCreator,
  isMe,
  iAmMod,
  quizPermissions,
  onClose,
  message,
}) => {
  const { mutateAsync: deleteQuizChatMessage } = useTypeSafeMutation(
    "deleteQuizChatMessage"
  );
  const { mutateAsync: blockFromQuiz } = useTypeSafeMutation("blockFromQuiz");
  const { mutateAsync: banFromQuizChat } =
    useTypeSafeMutation("banFromQuizChat");
  const { mutateAsync: unbanFromQuizChat } =
    useTypeSafeMutation("unbanFromQuizChat");
  const { data, isLoading } = useTypeSafeQuery(["getUserProfile", id], {}, [
    id,
  ]);

  const bannedUserIdMap = useQuizChatStore((s) => s.bannedUserIdMap);

  if (isLoading) {
    return (
      <div
        style={{ height: "400px", maxHeight: "100%" }}
        className={`flex items-center justify-center w-full`}
      >
        <Spinner />
      </div>
    );
  }

  if (!data) {
    return <div className={`flex text-primary-100`}>This user is gone.</div>;
  }

  const canDoModStuffOnThisUser = !isMe && (iAmCreator || iAmMod) && !isCreator;

  // [shouldShow, key, onClick, text]
  const buttonData = [
    [
      canDoModStuffOnThisUser &&
        !(id in bannedUserIdMap) &&
        (iAmCreator || !quizPermissions?.isMod),
      "unbanFromChat",
      () => {
        onClose();
        unbanFromQuizChat([id]);
      },
      "Unban from Chat",
    ],
    [
      canDoModStuffOnThisUser &&
        id in bannedUserIdMap &&
        (iAmCreator || !quizPermissions?.isMod),
      "banFromChat",
      () => {
        onClose();
        banFromQuizChat([id]);
      },
      "Ban from Chat",
    ],

    [
      canDoModStuffOnThisUser && (iAmCreator || !quizPermissions?.isMod),
      "blockFromQuiz",
      () => {
        onClose();
        blockFromQuiz([id]);
      },
      "Ban from Quiz",
    ],

    [
      !!message,
      "deleteMessage",
      () => {
        if (message?.id) {
          deleteQuizChatMessage([message.userId, message.id]);

          onClose();
        }
      },
      "Delete message",
    ],
  ] as const;

  return (
    <div className={`flex flex-col w-full`}>
      <div className={`flex bg-primary-900 flex-col`}>
        <VerticalUserInfoWithFollowButton
          idOrUsernameUsedForQuery={data.id}
          user={data}
        />
      </div>

      <div className="flex mt-1 px-6 flex-col">
        {buttonData.map(([shouldShow, key, onClick, text]) => {
          return shouldShow ? (
            <Button
              color="secondary"
              className={`mb-3`}
              key={key}
              onClick={onClick}
            >
              {text}
            </Button>
          ) : null;
        })}
      </div>
    </div>
  );
};

export const UserPreviewModal: React.FC<JoinQuizAndGetInfoResponse> = ({
  quiz,
  users,
}) => {
  const { isCreator: iAmCreator, isMod } = useCurrentQuizInfo();
  const { data, setData } = useContext(UserPreviewModalContext);
  const conn = useConn();

  return (
    <Modal
      variant="userPreview"
      onRequestClose={() => setData(null)}
      isOpen={!!data}
    >
      {!data ? null : (
        <UserPreview
          id={data.userId}
          isCreator={quiz.creatorId === data.userId}
          quizPermissions={
            users.find((u) => u.id === data.userId)?.quizPermissions
          }
          iAmCreator={iAmCreator}
          iAmMod={isMod}
          isMe={conn.user.id === data.userId}
          message={data.message}
          onClose={() => setData(null)}
        />
      )}
    </Modal>
  );
};
