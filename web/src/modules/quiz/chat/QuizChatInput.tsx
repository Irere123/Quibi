import React, { useEffect, useRef, useState } from "react";
import { useConn } from "../../../hooks/useConn";
import { useCurrentQuizFromCache } from "../../../hooks/useCurrentQuizFromCache";
import { useScreenType } from "../../../hooks/useScreenType";
import { useTypeSafeTranslation } from "../../../hooks/useTypeSafeTranslation";
import { Smiley } from "../../../icons";
import { createQuizChatMessage } from "../../../lib/createQuizChatMessage";
import { showErrorToast } from "../../../lib/showErrorToast";
import { customEmojis } from "../../../shared-components/EmoteData";
import { useEmojiPickerStore } from "../../../stores/useEmojiPickerStore";
import { EmojiPicker } from "../../../ui/EmojiPicker";
import { Input } from "../../../ui/Input";
import { navigateThroughQueriedEmojis } from "./navigateThroughQueriedEmojis";
import { navigateThroughQueriedUsers } from "./navigateThroughQueriedUsers";
import { useQuizChatMentionStore } from "./useQuizChatMentionStore";
import { useQuizChatStore } from "./useQuizChatStore";

interface ChatInputProps {
  users: any[];
}

export const QuizChatInput: React.FC<ChatInputProps> = ({ users }) => {
  const { setQueriedUsernames, mentions } = useQuizChatMentionStore();
  const { message, setMessage } = useQuizChatStore();
  const {
    setOpen,
    open,
    queryMatches,
    setQueryMatches,
    keyboardHoveredEmoji,
    setKeyboardHoveredEmoji,
  } = useEmojiPickerStore();
  const { t } = useTypeSafeTranslation();
  const inputRef = useRef<HTMLInputElement>(null);
  const [lastMessageTimestamp, setLastMessageTimestamp] = useState<number>(0);
  const conn = useConn();
  const screenType = useScreenType();
  const me = conn.user;

  let position = 0;

  useEffect(() => {
    if (!open && screenType !== "fullscreen") inputRef.current?.focus(); // Prevent autofocus on mobile
  }, [open, screenType]);

  const data = useCurrentQuizFromCache();

  if (data && !("error" in data) && data.quiz.chatMode === "disabled") {
    return (
      <p className="my-4 text-center text-primary-300">
        {t("modules.quizChat.disabled")}
      </p>
    );
  }

  const handleSubmit = (
    e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();

    if (!me) return;

    if (me.id in useQuizChatStore.getState().bannedUserIdMap) {
      showErrorToast(t("modules.quizChat.bannedAlert"), "error");
      return;
    }

    if (Date.now() - lastMessageTimestamp <= 1000) {
      showErrorToast(t("modules.quizChat.waitAlert"), "info");
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

    conn.sendCall("send_quiz_chat_msg", messageData);
    setQueriedUsernames([]);

    setLastMessageTimestamp(Date.now());
  };

  return (
    <form onSubmit={handleSubmit} className={`pb-3 px-4 pt-2 flex flex-col`}>
      <div className={`flex mb-1`}>
        <EmojiPicker
          emojiSet={customEmojis as any}
          onEmojiSelect={(emoji) => {
            position =
              (position === 0
                ? inputRef!.current!.selectionStart
                : position + 2) || 0;

            let msg = "";

            if ((message.match(/:/g)?.length ?? 0) % 2) {
              msg = message.split("").reverse().join("");
              msg = msg.replace(msg.split(":")[0] + ":", "");
              msg = msg.split("").reverse().join("");
            } else {
              msg = message;
            }

            const newMsg = [
              msg.slice(0, position),
              (`:${emoji.short_names[0]}:` || "") + " ",
              msg.slice(position),
            ].join("");
            setMessage(newMsg);
          }}
        />
      </div>
      <div className="flex items-stretch">
        <div className="flex flex-1 mr-2 lg:mr-0 items-center bg-primary-700 rounded-8">
          <Input
            maxLength={512}
            placeholder={t("modules.chat.sendMessage")}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            id="room-chat-input"
            transparent
            ref={inputRef}
            autoComplete="off"
            onKeyDown={
              queryMatches.length
                ? navigateThroughQueriedEmojis
                : navigateThroughQueriedUsers
            }
            onFocus={() => {
              setOpen(false);
              position = 0;
            }}
          />
          <div
            className={`right-12 cursor-pointer flex flex-row-reverse fill-current text-primary-200 mr-3`}
            onClick={() => {
              setOpen(!open);
              position = 0;
            }}
          >
            <Smiley style={{ inlineSize: "23px" }}></Smiley>
          </div>
        </div>
      </div>
    </form>
  );
};
