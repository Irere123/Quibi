import create from "zustand";
import { combine } from "zustand/middleware";

export const useRoomChatStore = create(
  combine(
    {
      messages: [] as any[],
      message: "" as string,
      isRoomChatScrolledToTop: false,
      frozen: false,
    },
    (set) => ({
      addMessage: (m: any) =>
        set((s) => ({
          messages: [
            { ...m },
            ...(s.messages.length > 100
              ? s.messages.slice(0, 100)
              : s.messages),
          ],
        })),
      setMessages: (messages: any[]) =>
        set((s) => ({
          messages,
        })),
      setMessage: (message: string) =>
        set({
          message,
        }),
      setIsRoomChatScrolledToTop: (isRoomChatScrolledToTop: boolean) =>
        set({
          isRoomChatScrolledToTop,
        }),
      toggleFrozen: () => set((s) => ({ frozen: !s.frozen })),
    })
  )
);
