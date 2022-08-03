import React, { useRef, useState } from "react";
import { useTypeSafeTranslation } from "../../../hooks/useTypeSafeTranslation";
import { Input } from "../../../ui/Input";

interface ChatInputProps {}

export const QuizChatInput: React.FC<ChatInputProps> = () => {
  const { t } = useTypeSafeTranslation();
  const [message, setMessage] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (
    e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
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
            ref={inputRef}
            autoComplete="off"
          />
        </div>
      </div>
    </form>
  );
};
