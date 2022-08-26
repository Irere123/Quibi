import create from "zustand";
import { BaseUser } from "@quibi/client";
import { combine } from "zustand/middleware";
import { useSoundEffectStore } from "../../sound-effects/useSoundEffectStore";

export const useQuizChatMentionStore = create(
  combine(
    {
      mentions: [] as BaseUser[],
      queriedUsernames: [] as BaseUser[],
      activeUsername: "",
      iAmMentioned: 0,
    },
    (set) => ({
      setMentions: (mentions: BaseUser[]) =>
        set({
          mentions,
        }),
      setQueriedUsernames: (queriedUsernames: BaseUser[]) =>
        set({
          queriedUsernames,
        }),
      setActiveUsername: (activeUsername: string) => {
        return set({
          activeUsername,
        });
      },
      resetIAmMentioned: () =>
        set({
          iAmMentioned: 0,
        }),
      incrementIAmMentioned: () => {
        useSoundEffectStore.getState().playSoundEffect("quizChatMention");
        set((x) => ({ iAmMentioned: x.iAmMentioned + 1 }));
      },
    })
  )
);
