import React, { useContext } from "react";
import { useConn } from "../../hooks/useConn";
import { useCurrentQuizInfo } from "../../hooks/useCurrentQuizInfo";
import { useTypeSafeMutation } from "../../hooks/useTypeSafeMutation";
import { useTypeSafeQuery } from "../../hooks/useTypeSafeQuery";
import { Button } from "../../ui/Button";
import { Modal } from "../../ui/Modal";
import { Spinner } from "../../ui/Spinner";
import { VerticalUserInfo } from "../../ui/VerticalUserInfo";
import { QuizChatMessage, useQuizChatStore } from "./chat/useQuizChatStore";
import { UserPreviewModalContext } from "./UserPreviewModalProvider";

const UserPreview: React.FC<{
  id: string;
  message?: QuizChatMessage;
  isMe: boolean;
  isCreator: boolean;
  iAmCreator: boolean;
  onClose: () => void;
}> = ({ iAmCreator, id, isCreator, isMe, onClose, message }) => {
  const { mutateAsync: deleteQuizChatMessage } = useTypeSafeMutation(
    "deleteQuizChatMessage"
  );
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

  const canDoModStuffOnThisUser = iAmCreator || isCreator;

  // [shouldShow, key, onClick, text]
  const buttonData = [
    [
      canDoModStuffOnThisUser && id in bannedUserIdMap,
      "unbanFromChat",
      () => {
        onClose();
        unbanFromQuizChat([id]);
      },
      "Unban from Chat",
    ],
    [
      canDoModStuffOnThisUser && iAmCreator && !isMe,
      "banFromChat",
      () => {
        onClose();
        banFromQuizChat([id]);
      },
      "Ban from Chat",
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
        <VerticalUserInfo user={data} />
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

export const UserPreviewModal: React.FC = () => {
  const { isCreator: iAmCreator } = useCurrentQuizInfo();
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
          isCreator={iAmCreator}
          iAmCreator={iAmCreator}
          isMe={conn.user.id === data.userId}
          message={data.message}
          onClose={() => setData(null)}
        />
      )}
    </Modal>
  );
};
