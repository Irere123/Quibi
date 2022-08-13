import create from "zustand";
import { combine } from "zustand/middleware";

type Fn = (currentQuizId: string | null) => string | null;

export const useCurrentQuizIdStore = create(
  combine(
    {
      currentQuizId: null as string | null,
    },
    (set) => ({
      set,
      setCurrentQuizId: (currentQuizIdOrFn: string | null | Fn) => {
        if (typeof currentQuizIdOrFn === "function") {
          set((s) => ({ currentQuizId: currentQuizIdOrFn(s.currentQuizId) }));
        } else {
          set({ currentQuizId: currentQuizIdOrFn });
        }
      },
    })
  )
);
