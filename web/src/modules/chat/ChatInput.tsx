import React, { useRef } from "react";
import { useTypeSafeTranslation } from "../../hooks/useTypeSafeTranslation";
import { Smiley } from "../../icons";
import { EmojiPicker } from "../../ui/EmojiPicker";
import { Input } from "../../ui/Input";
import { customEmojis } from "./EmoteData";
import { navigateThroughQueriedEmojis } from "./navigateThroughQueriedEmojis";
import { useChatStore } from "../../store/useChatStore";
import { useEmojiPickerStore } from "../../store/useEmojiPickerStore";

export const ChatInput: React.FC = () => {
  const { message, setMessage } = useChatStore();
  const { setOpen, open } = useEmojiPickerStore();
  const inputRef = useRef<HTMLInputElement>(null);
  const { t } = useTypeSafeTranslation();

  let position = 0;

  const handleSubmit = (
    e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
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
          <div className="flex flex-1 lg:mr-0 items-center border-2 border-black rounded">
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
