import React from "react";
import { useTypeSafeQuery } from "../../hooks/useTypeSafeQuery";
import { useCurrentQuizIdStore } from "../../stores/useCurentQuizIdStore";
import { QuizChat } from "./chat/QuizChat";

export const QuizChatController: React.FC = () => {
  const { currentQuizId } = useCurrentQuizIdStore();

  const { data } = useTypeSafeQuery(
    ["joinQuizAndGetInfo", currentQuizId || ""],
    {
      enabled: false,
    },
    [currentQuizId || ""]
  );

  if (!data || "error" in data) {
    return null;
  }

  return <QuizChat {...data} />;
};
