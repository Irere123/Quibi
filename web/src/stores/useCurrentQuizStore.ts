import create from "zustand";
import { combine } from "zustand/middleware";
import { useQuizChatStore } from "../modules/quiz/chat/useQuizChatStore";

type Fn = (currentQuizId: string | null) => string | null;

export const useCurrentQuizIdStore = create(
  combine(
    {
      currentQuizId: null as string | null,
    },
    (set, get) => ({
      set,
      setCurrentQuizId: (currentQuizIdOrFn: string | null | Fn) => {
        const id = get().currentQuizId;
        const newId =
          typeof currentQuizIdOrFn === "function"
            ? currentQuizIdOrFn(id)
            : currentQuizIdOrFn;
        if (newId !== id) {
          useQuizChatStore.getState().reset();
        }
        set({ currentQuizId: newId });
      },
    })
  )
);
