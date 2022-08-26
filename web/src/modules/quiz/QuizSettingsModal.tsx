import React from "react";
import { ChatMode } from "@quibi/client";
import { useWrappedConn } from "../../hooks/useConn";
import { useTypeSafeQuery } from "../../hooks/useTypeSafeQuery";
import { useTypeSafeUpdateQuery } from "../../hooks/useTypeSafeUpdateQuery";
import { InfoText } from "../../ui/InfoText";
import { Modal } from "../../ui/Modal";
import { NativeRadio } from "../../ui/NativeRadio";
import { NativeSelect } from "../../ui/NativeSelect";
import { Spinner } from "../../ui/Spinner";
import { BlockedFromQuizUsers } from "./BlockedFromQuizUsers";

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

  const options = [
    {
      label: "Enabled",
      value: "default",
    },
    {
      label: "Disabled",
      value: "disabled",
    },
    {
      label: "Follower only",
      value: "follower_only",
    },
  ];

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
                !d || "error" in d
                  ? d
                  : { ...d, quiz: { ...d.quiz, autoSpeaker } }
              );
              conn.mutation.quizUpdate({ autoSpeaker });
            }}
          />
          {/* chat disabled */}
          <label className={`mt-2`} htmlFor="chat-mode">
            <div className={`text-primary-100 mb-1`}>Chat mode</div>
            <NativeSelect
              value={data.quiz.chatMode}
              onChange={(e) => {
                const chatMode = e.target.value as ChatMode;
                updater(["joinQuizAndGetInfo", data.quiz.id], (d) => {
                  return !d || "error" in d
                    ? d
                    : { ...d, quiz: { ...d.quiz, chatMode } };
                });
                conn.mutation.quizUpdate({ chatMode });
              }}
              id="chat-mode"
            >
              {options.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}&nbsp;&nbsp;&nbsp;
                </option>
              ))}
            </NativeSelect>
          </label>
          <BlockedFromQuizUsers />
        </div>
      )}
    </Modal>
  );
};
