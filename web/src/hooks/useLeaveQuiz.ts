import { useCallback } from "react";
import { useQuizChatStore } from "../modules/quiz/chat/useQuizChatStore";
import { useCurrentQuizIdStore } from "../stores/useCurentQuizIdStore";
import { useTypeSafeMutation } from "./useTypeSafeMutation";

export const useLeaveQuiz = () => {
  const { mutateAsync, isLoading } = useTypeSafeMutation("leaveQuiz");

  return {
    leaveQuiz: useCallback(() => {
      mutateAsync([]);
      useCurrentQuizIdStore.getState().setCurrentQuizId(null);
      useQuizChatStore.getState().reset();
    }, [mutateAsync]),
    isLoading,
  };
};
