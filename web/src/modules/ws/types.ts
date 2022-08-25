export type WsParam = {
  op: string;
  d: any;
};

export type JoinQuizAndGetInfoResponse = {
  quiz: Quiz;
  users: QuizUser[];
  quizId: string;
  activeSpeakerMap: Record<string, boolean>;
  autoSpeaker: boolean;
  chatMode: boolean;
};

export type UUID = string;
export type ChatMode = "default" | "disabled" | "follower_only";

export type UserPreview = {
  id: UUID;
  displayName: string;
  numFollowers: number;
  avatarUrl: string | null;
};

export type User = {
  currentQuizId: any;
  id: UUID;
  displayName: string;
  username: string;
  bio: string | null;
  email: string;
  online: boolean;
  numFollowing: number;
  numFollowers: number;
  youAreFollowing?: boolean;
  lastOnline: string;
  followsYou?: boolean;
  iBlockedThem: boolean;
  avatarUrl: string;
  bannerUrl: string | null;
  inserted_at: string;
};

export type QuizDetails = {
  name: string;
  chatThrottle: number;
  isPrivate: boolean;
  description: string;
};

export type Quiz = QuizDetails & {
  id: string;
  creatorId: string;
  numPeopleInside: number;
  peoplePreviewList: Array<UserPreview>;
  inserted_at: string;
  autoSpeaker: boolean;
  chatMode: ChatMode;
};

export type QuizPermissions = {
  askedToSpeak: boolean;
  isSpeaker: boolean;
  isMod: boolean;
};

export type QuizUser = {
  quizPermissions?: QuizPermissions | null;
} & User;

export type QuizChatMessageToken<T extends string = string, V = unknown> = {
  t: T;
  v: V;
};

export type TextToken = QuizChatMessageToken<"text", string>;
export type MentionToken = QuizChatMessageToken<"mention", string>;
export type LinkToken = QuizChatMessageToken<"link", string>;
export type EmoteToken = QuizChatMessageToken<"emote", string>;
export type CodeBlockToken = QuizChatMessageToken<"block", string>;
export type EmojiToken = QuizChatMessageToken<"emoji", string>;

export type QuizMessage = {
  id: UUID;
  userId: UUID;
  avatarUrl: string;
  color: string;
  displayName: string;
  tokens: QuizChatMessageToken[];
  username: string;
  deleted?: boolean;
  deleterId?: UUID;
  sentAt: string;
};
