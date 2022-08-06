import React from "react";
import { QuizChatHeader } from "./chat/QuizChatHeader";
import { QuizChatInput } from "./chat/QuizChatInput";
import { QuizChatList } from "./chat/QuizChatList";

export const QuizChatController: React.FC = () => {
  return (
    <div
      className={`flex flex-1 w-full mb-7 overflow-y-auto bg-primary-800 h-full rounded-lg`}
    >
      <div className={`flex flex-1 w-full flex-col mt-4`}>
        <QuizChatHeader
          description={`Elon Reeve Musk FRS is a business magnate and investor. He is the
        founder, CEO, and Chief Engineer at Space`}
        />
        <QuizChatList />
        <QuizChatInput />
      </div>
    </div>
  );
};
