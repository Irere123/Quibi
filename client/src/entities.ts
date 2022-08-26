export type UUID = string;

export type ChatMode = "default" | "disabled" | "follower_only";

export type UserPreview = {
  id: UUID;
  displayName: string;
  numFollowers: number;
  avatarUrl: string | null;
};

export type QuizDetails = {
  name: string;
  chatThrottle: number;
  isPrivate: boolean;
  description: string;
};

export type Quiz = QuizDetails & {
  id: string;
  numPeopleInside: number;
  creatorId: string;
  peoplePreviewList: Array<UserPreview>;
  autoSpeaker: boolean;
  inserted_at: string;
  chatMode: ChatMode;
};

export interface ScheduledQuiz {
  quizId: UUID | null;
  description: string;
  scheduledFor: string;
  numAttending: number;
  name: string;
  id: UUID;
  creatorId: UUID;
  creator: User;
}

export type User = {
  youAreFollowing?: boolean;
  username: string;
  online: boolean;
  numFollowing: number;
  numFollowers: number;
  lastOnline: string;
  id: UUID;
  followsYou?: boolean;
  botOwnerId?: string | null;
  staff: boolean;
  displayName: string;
  currentQuizId?: UUID | null;
  currentQuiz: Quiz;
  bio: string | null;
  avatarUrl: string;
  bannerUrl: string | null;
  inserted_at: string;
};

export type QuizMessageToken<T extends string = string, V = unknown> = {
  t: T;
  v: V;
};

export type QuizTextToken = QuizMessageToken<"text", string>;
export type QuizMentionToken = QuizMessageToken<"mention", string>;
export type QuizLinkToken = QuizMessageToken<"link", string>;
export type QuizEmoteToken = QuizMessageToken<"emote", string>;
export type QuizCodeBlockToken = QuizMessageToken<"block", string>;
export type QuizEmojiToken = QuizMessageToken<"emoji", string>;

export type Message = {
  id: UUID;
  userId: UUID;
  avatarUrl: UUID;
  color: string;
  displayName: string;
  tokens: QuizMessageToken[];
  username: string;
  deleted?: boolean;
  deleterId?: UUID;
  sentAt: string;
};

export type BaseUser = {
  username: string;
  online: boolean;
  lastOnline: string;
  id: string;
  bio: string;
  displayName: string;
  avatarUrl: string;
  bannerUrl: string;
  numFollowing: number;
  numFollowers: number;
  currentQuiz?: Quiz;
  botOwnerId?: string;
  staff: boolean;
  inserted_at: string;
};

export type QuizPermissions = {
  askedToSpeak: boolean;
  isSpeaker: boolean;
  isMod: boolean;
};

export type UserWithFollowInfo = BaseUser & {
  followsYou?: boolean;
  youAreFollowing?: boolean;
  iBlockedThem?: boolean;
};

export type QuizUser = {
  quizPermissions?: QuizPermissions | null;
} & UserWithFollowInfo;

export type CurrentQuiz = Quiz & {
  users: QuizUser[];
  activeSpeakerMap: BooleanMap;
  autoSpeaker: boolean;
};

export type BooleanMap = Record<UUID, boolean>;

export enum QuizRole {
  speaker = 8,
  raised_hand = 16,
  listener = 32,
}

export enum QuizAuth {
  owner = 8,
  mod = 16,
  user = 32,
}
