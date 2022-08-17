import React, { useRef, useState } from "react";
import { useConn } from "../../../hooks/useConn";
import { useTypeSafeTranslation } from "../../../hooks/useTypeSafeTranslation";
import { createQuizChatMessage } from "../../../lib/createQuizChatMessage";
import { showErrorToast } from "../../../lib/showErrorToast";
import { Input } from "../../../ui/Input";
import { navigateThroughQueriedUsers } from "./navigateThroughQueriedUsers";
import { useQuizChatMentionStore } from "./useQuizChatMentionStore";
import { useQuizChatStore } from "./useQuizChatStore";

interface ChatInputProps {
  users: any[];
}

export const QuizChatInput: React.FC<ChatInputProps> = ({ users }) => {
  const { setQueriedUsernames, mentions } = useQuizChatMentionStore();
  const { message, setMessage } = useQuizChatStore();
  const { t } = useTypeSafeTranslation();
  const inputRef = useRef<HTMLInputElement>(null);
  const [lastMessageTimestamp, setLastMessageTimestamp] = useState<number>(0);
  const conn = useConn();
  const me = conn.user;

  const handleSubmit = (
    e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();

    if (!me) return;

    if (me.id in useQuizChatStore.getState().bannedUserIdMap) {
      showErrorToast("You have been banned from chat");
      return;
    }

    if (Date.now() - lastMessageTimestamp <= 1000) {
      showErrorToast(
        "You have to wait a second before sending another message"
      );
      return;
    }

    const tmp = message;
    const messageData = createQuizChatMessage(tmp, mentions, users);

    // dont empty the input, if no tokens
    if (!messageData.tokens.length) return;
    setMessage("");

    if (
      !message ||
      !message.trim() ||
      !message.replace(/[\u200B-\u200D\uFEFF]/g, "")
    ) {
      return;
    }

    conn.send("send_quiz_chat_msg", messageData);
    setQueriedUsernames([]);

    setLastMessageTimestamp(Date.now());
  };

  return (
    <form onSubmit={handleSubmit} className={`pb-3 px-4 pt-2 flex flex-col`}>
      <div className="flex items-stretch">
        <div className="flex flex-1 lg:mr-0 items-center bg-primary-700 rounded-lg">
          <Input
            maxLength={512}
            placeholder={t("modules.chat.sendMessage")}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            id="quiz-chat-input"
            transparent
            onKeyDown={navigateThroughQueriedUsers}
            ref={inputRef}
            autoComplete="off"
          />
        </div>
      </div>
    </form>
  );
};
