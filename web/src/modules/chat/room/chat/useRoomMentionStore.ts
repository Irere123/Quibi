import create from "zustand";
import { combine } from "zustand/middleware";
import { useSoundEffectStore } from "../../../sound-effects/useSoundEffectStore";
import { User } from "../../../ws";

export const useRoomChatMentionStore = create(
  combine(
    {
      queriedUsernames: [] as User[],
      activeUsername: "",
      iAmMentioned: 0,
    },
    (set) => ({
      setQueriedUsernames: (queriedUsernames: User[]) =>
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
