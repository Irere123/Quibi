import React from "react";
import { QuizChatHeader } from "./chat/QuizChatHeader";
import { QuizChatInput } from "./chat/QuizChatInput";
import { QuizChatList } from "./chat/QuizChatList";
import { useGetQuizByQueryParams } from "./useGetQuizByQueryParams";

export const QuizChatController: React.FC = () => {
  const { data, isLoading } = useGetQuizByQueryParams();

  if (!data) {
    return null;
  }

  if (isLoading) {
    return null;
  }

  return (
    <div
      className={`flex flex-1 w-full mb-7 overflow-y-auto bg-primary-800 h-full rounded-lg`}
    >
      <div className={`flex flex-1 w-full flex-col mt-4`}>
        <QuizChatHeader description={data.quiz.description} />
        <QuizChatList />
        <QuizChatInput />
      </div>
    </div>
  );
};
