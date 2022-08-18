import create from "zustand";
import { combine } from "zustand/middleware";
import { useQuizChatMentionStore } from "./useQuizChatMentionStore";

interface TextToken {
  t: "text";
  v: string;
}

interface LinkToken {
  t: "link";
  v: string;
}

interface BlockToken {
  t: "block";
  v: string;
}

interface MentionToken {
  t: "mention";
  v: string;
}

export type QuizChatMessageToken =
  | TextToken
  | LinkToken
  | BlockToken
  | MentionToken;

const colors = [
  "#ff2366",
  "#fd51d9",
  "#face15",
  "#8d4de8",
  "#6859ea",
  "#7ed321",
  "#56b2ba",
  "#00CCFF",
  "#FF9900",
  "#FFFF66",
];

function generateColorFromString(str: string) {
  let sum = 0;
  for (let x = 0; x < str.length; x++) sum += x * str.charCodeAt(x);
  return colors[sum % colors.length];
}

export interface QuizChatMessage {
  id: string;
  userId: string;
  avatarUrl: string;
  color: string;
  username: string;
  displayName: string;
  deleted?: boolean;
  deleterId?: string;
  tokens: QuizChatMessageToken[];
  sentAt: string;
}

export const useQuizChatStore = create(
  combine(
    {
      open: false,
      messages: [] as QuizChatMessage[],
      bannedUserIdMap: {} as Record<string, boolean>,
      newUnreadMessages: false,
      message: "" as string,
      isQuizChatScrolledToTop: false,
      frozen: false,
    },
    (set) => ({
      unbanUser: (userId: string) =>
        set(({ bannedUserIdMap: { [userId]: _, ...banMap }, ...s }) => ({
          messages: s.messages.filter((m) => m.userId !== userId),
          bannedUserIdMap: banMap,
        })),
      addBannedUser: (userId: string) =>
        set((s) => ({
          messages: s.messages.filter((m) => m.userId !== userId),
          bannedUserIdMap: { ...s.bannedUserIdMap, [userId]: true },
        })),
      addMessage: (m: QuizChatMessage) =>
        set((s) => ({
          newUnreadMessages: !s.open,
          messages: [
            { ...m, color: generateColorFromString(m.userId) },
            ...(s.messages.length <= 100 || s.frozen
              ? s.messages
              : s.messages.slice(0, 100)),
          ],
        })),
      setMessages: (messages: QuizChatMessage[]) =>
        set((s) => ({
          messages,
        })),
      clearChat: () =>
        set({
          messages: [],
          newUnreadMessages: false,
          bannedUserIdMap: {},
        }),
      reset: () =>
        set({
          messages: [],
          newUnreadMessages: false,
          message: "",
          bannedUserIdMap: {},
        }),
      toggleOpen: () =>
        set((s) => {
          // Reset mention state
          useQuizChatMentionStore.getState().resetIAmMentioned();
          if (s.open) {
            return {
              open: false,
              newUnreadMessages: false,
            };
          } else {
            return {
              open: true,
              newUnreadMessages: false,
            };
          }
        }),
      setMessage: (message: string) =>
        set({
          message,
        }),
      setOpen: (open: boolean) => set((s) => ({ ...s, open })),
      setIsQuizhatScrolledToTop: (isQuizChatScrolledToTop: boolean) =>
        set({
          isQuizChatScrolledToTop,
        }),
      toggleFrozen: () => set((s) => ({ frozen: !s.frozen })),
    })
  )
);
