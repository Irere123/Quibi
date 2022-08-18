import React, { useEffect, useRef, useState } from "react";
import { useTypeSafeTranslation } from "../../../../hooks/useTypeSafeTranslation";
import { Smiley } from "../../../../icons";
import { EmojiPicker } from "../../../../ui/EmojiPicker";
import { Input } from "../../../../ui/Input";
import { customEmojis } from "./EmoteData";
import { navigateThroughQueriedEmojis } from "./navigateThroughQueriedEmojis";
import { useRoomChatStore } from "./useRoomChatStore";
import { useEmojiPickerStore } from "../../../../stores/useEmojiPickerStore";
import { showErrorToast } from "../../../../lib/showErrorToast";
import { useRoomChatMentionStore } from "./useRoomMentionStore";
import { useConn } from "../../../../hooks/useConn";
import { useGetRoomFromQueryParams } from "../../useGetRoomFromQueryParams";
import { useTypeSafeMutation } from "../../../../hooks/useTypeSafeMutation";

export const RoomChatInput: React.FC = () => {
  const { data } = useGetRoomFromQueryParams();
  const { setQueriedUsernames } = useRoomChatMentionStore();
  const { message, setMessage } = useRoomChatStore();
  const { setOpen, open } = useEmojiPickerStore();
  const [lastMessageTimestamp, setLastMessageTimestamp] = useState<number>(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const conn = useConn();
  const { t } = useTypeSafeTranslation();
  const me = conn.user;
  const { mutate } = useTypeSafeMutation("sendRoomChatMessage");

  let position = 0;

  useEffect(() => {
    if (!open) inputRef.current?.focus();
  }, [open]);

  const handleSubmit = (
    e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();

    if (!me) return;

    if (Date.now() - lastMessageTimestamp <= 1000) {
      showErrorToast(
        "You have to wait a second before sending another message"
      );
      return;
    }

    if (
      !message ||
      !message.trim() ||
      !message.replace(/[\u200B-\u200D\uFEFF]/g, "")
    ) {
      return;
    }

    mutate([{ roomId: data.id, message }]);
    setQueriedUsernames([]);

    setLastMessageTimestamp(Date.now());
  };

  return (
    <form onSubmit={handleSubmit} className={`pb-3 px-4 pt-2 flex flex-col`}>
      <div className={`mb-1 block relative`}>
        <EmojiPicker
          emojiSet={customEmojis}
          onEmojiSelect={(emoji) => {
            position =
              (position === 0
                ? inputRef!.current!.selectionStart
                : position + 2) || 0;

            const newMsg = [
              message.slice(0, position),
              (message.endsWith(" ") ? "" : " ") +
                (`:${emoji.short_names[0]}:` || "") +
                " ",
              message.slice(position),
            ].join("");
            setMessage(newMsg);
          }}
        />
      </div>
      <div className="flex items-stretch">
        <div className="flex-1">
          <div className="flex flex-1 mr-2 lg:mr-0 items-center bg-primary-700 rounded">
            <Input
              maxLength={512}
              placeholder={t("modules.chat.sendMessage")}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              id="room-chat-input"
              transparent
              ref={inputRef}
              autoComplete="off"
              onKeyDown={navigateThroughQueriedEmojis}
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
              <Smiley style={{ inlineSize: "25px" }} />
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};
