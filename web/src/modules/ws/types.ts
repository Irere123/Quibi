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

export type UserPreview = {
  id: UUID;
  displayName: string;
  username: string;
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

export type Quiz = {
  id: string;
  name: string;
  description?: string;
  creatorId: string;
  numPeopleInside: number;
  isPrivate: boolean;
  peoplePreviewList: Array<UserPreview>;
  inserted_at: string;
};

export type QuizPermissions = {
  askedToSpeak: boolean;
  isSpeaker: boolean;
  isMod: boolean;
};

export type QuizUser = {
  quizPermissions?: QuizPermissions | null;
} & User;
