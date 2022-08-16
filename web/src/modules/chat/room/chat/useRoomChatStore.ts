import create from "zustand";
import { combine } from "zustand/middleware";

interface TextToken {
  t: "text";
  v: string;
}
interface MentionToken {
  t: "mention";
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

export type RoomChatMessageToken =
  | TextToken
  | MentionToken
  | LinkToken
  | BlockToken
  | EmoteToken;

export interface RoomChatMessage {
  id: string;
  userId: string;
  avatarUrl: string;
  color: string;
  username: string;
  displayName: string;
  tokens: RoomChatMessageToken[];
  deleted?: boolean;
  deleterId?: string;
  sentAt: string;
  isWhisper?: boolean;
}

export const useRoomChatStore = create(
  combine(
    { messages: [] as RoomChatMessage[], message: "" as string },
    (set) => ({
      addMessage: (m: RoomChatMessage) =>
        set((s) => ({
          messages: [
            { ...m },
            ...(s.messages.length > 100
              ? s.messages.slice(0, 100)
              : s.messages),
          ],
        })),
      setMessages: (messages: RoomChatMessage[]) =>
        set((s) => ({
          messages,
        })),
      setMessage: (message: string) =>
        set({
          message,
        }),
    })
  )
);
