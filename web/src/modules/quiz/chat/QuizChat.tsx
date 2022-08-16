import React, { useMemo } from "react";
import { Quiz, User } from "../../ws";
import { QuizChatHeader } from "./QuizChatHeader";
import { QuizChatInput } from "./QuizChatInput";
import { QuizChatList } from "./QuizChatList";
import { QuizChatMentions } from "./QuizChatMentions";

interface ChatProps {
  quiz: Quiz;
  users: User[];
}

export const QuizChat: React.FC<ChatProps> = ({ quiz, users }) => {
  const userMap = useMemo(() => {
    const map: Record<string, User> = {};

    users.forEach((u) => {
      map[u.id] = u;
    });
    return map;
  }, [users]) as any;

  return (
    <div
      className={`flex flex-1 w-full mb-7 overflow-y-auto bg-primary-800 h-full rounded-lg`}
    >
      <div className={`flex flex-1 w-full flex-col mt-4`}>
        <QuizChatHeader description={quiz.description!} />
        <QuizChatList quiz={quiz} userMap={userMap} />
        <QuizChatMentions users={users} />
        <QuizChatInput users={users} />
      </div>
    </div>
  );
};