import create from "zustand";
import { combine } from "zustand/middleware";

interface TextToken {
  t: "text";
  v: string;
}

interface LinkToken {
  t: "link";
  v: string;
}

export type QuizChatMessageToken = TextToken | LinkToken;

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
  tokens: QuizChatMessageToken[];
  deleted?: boolean;
  deleterId?: string;
}

export const useQuizChatStore = create(
  combine(
    {
      open: false,
      messages: [] as QuizChatMessage[],
      newUnreadMessages: false,
      message: "" as string,
      isQuizChatScrolledToTop: false,
      frozen: false,
    },
    (set) => ({
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
        }),
      reset: () =>
        set({
          messages: [],
          newUnreadMessages: false,
          message: "",
        }),
      toggleOpen: () =>
        set((s) => {
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
      setIsRoomChatScrolledToTop: (isQuizChatScrolledToTop: boolean) =>
        set({
          isQuizChatScrolledToTop,
        }),
      toggleFrozen: () => set((s) => ({ frozen: !s.frozen })),
    })
  )
);
