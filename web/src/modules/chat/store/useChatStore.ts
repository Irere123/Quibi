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

interface BlockToken {
  t: "block";
  v: string;
}

interface EmoteToken {
  t: "emote";
  v: string;
}

export type ChatMessageToken = TextToken | LinkToken | BlockToken | EmoteToken;

export interface ChatMessage {
  id: string;
  userId: string;
  avatarUrl: string;
  username: string;
  tokens: ChatMessageToken[];
  sentAt: string;
}

export const useChatStore = create(
  combine(
    {
      open: false,
      messages: [] as ChatMessage[],
      newUnreadMessages: false,
      message: "" as string,
      isChatScrolledToTop: false,
      frozen: false,
    },
    (set) => ({
      addMessage: (m: ChatMessage) =>
        set((s) => ({
          newUnreadMessages: !s.open,
          messages: [
            { ...m },
            ...(s.messages.length <= 100 || s.frozen
              ? s.messages
              : s.messages.slice(0, 100)),
          ],
        })),
      setMessages: (messages: ChatMessage[]) =>
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
      setIsChatScrolledToTop: (isChatScrolledToTop: boolean) =>
        set({
          isChatScrolledToTop,
        }),
      toggleFrozen: () => set((s) => ({ frozen: !s.frozen })),
    })
  )
);
