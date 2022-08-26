import { Quiz, QuizUser, ScheduledQuiz, User, UUID } from "../entities";

export type GetTopPublicQuizesResponse = {
  quizes: Quiz[];
  nextCursor: number | null;
};

export type GetScheduledQuizesResponse = {
  nextCursor: string | null;
  quizes: ScheduledQuiz[];
};

export type JoinQuizAndGetInfoResponse = {
  quiz: Quiz;
  users: QuizUser[];
  quizId: string;
  activeSpeakerMap: Record<string, boolean>;
};

export type GetQuizUsersResponse = {
  users: User[];
  quizId: UUID;
  raiseHandMap: Record<string, boolean>;
  autoSpeaker: boolean;
  activeSpeakerMap: Record<string, boolean>;
};

export type NewQuizDetailsResponse = {
  quizId: UUID;
  name: string;
  chatThrottle: number;
  isPrivate: boolean;
  description: string;
};

export type InvitationToQuizResponse = {
  type: "invite";
  username: string;
  displayName: string;
  avatarUrl: string;
  bannerUrl: string;
  quizName: string;
  quizId: UUID;
};
