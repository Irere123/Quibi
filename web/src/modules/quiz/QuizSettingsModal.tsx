import React, { useState } from "react";
import { useWrappedConn } from "../../hooks/useConn";
import { useTypeSafeQuery } from "../../hooks/useTypeSafeQuery";
import { useTypeSafeUpdateQuery } from "../../hooks/useTypeSafeUpdateQuery";
import { ChatBubble } from "../../icons";
import { InfoText } from "../../ui/InfoText";
import { Modal } from "../../ui/Modal";
import { NativeCheckbox } from "../../ui/NativeCheckbox";
import { NativeRadio } from "../../ui/NativeRadio";
import { Spinner } from "../../ui/Spinner";

interface Props {
  onRequestClose: () => void;
  quizId: string;
}

export const QuizSettingsModal: React.FC<Props> = ({
  onRequestClose,
  quizId,
}) => {
  const conn = useWrappedConn();
  const { data, isLoading } = useTypeSafeQuery(
    ["joinQuizAndGetInfo", quizId],
    {
      enabled: !!quizId,
      refetchOnMount: "always",
    },
    [quizId]
  );

  const updater = useTypeSafeUpdateQuery();

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

  return (
    <Modal title="Settings" isOpen={!!quizId} onRequestClose={onRequestClose}>
      {!data || "error" in data ? (
        <InfoText>something went wrong</InfoText>
      ) : (
        <div className={`flex flex-col gap-3 w-full`}>
          <NativeRadio
            subtitle="Anyone can ask questions"
            title="Auto speaker"
            checked={data.autoSpeaker}
            onClick={() => {
              const autoSpeaker = !data.autoSpeaker;
              updater(["joinQuizAndGetInfo", quizId!], (d) =>
                !d ? d : { ...d, autoSpeaker }
              );
              conn.mutation.setAutoSpeaker(autoSpeaker);
            }}
          />
          <NativeRadio
            subtitle="Allow people to chat"
            title="Chat"
            checked={data.chatMode}
            onClick={() => {
              const chatMode = !data.chatMode;
              updater(["joinQuizAndGetInfo", quizId!], (d) =>
                !d ? d : { ...d, chatMode }
              );
              conn.mutation.setQuizChatMode(chatMode);
            }}
          />
        </div>
      )}
    </Modal>
  );
};
