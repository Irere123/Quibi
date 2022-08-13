import { Connection } from "./raw";

export const wrap = (connection: Connection) => ({
  connection,
  subscribe: {},
  query: {
    search: (query: string): Promise<any> =>
      connection.fetch("search", { query }),
    getUserProfile: (idOrUsername: string): Promise<any> =>
      connection.fetch("get_user_profile", { userIdOrUsername: idOrUsername }),
    getTopPublicQuizes: (cursor = 0): Promise<any> =>
      connection.fetch("get_top_public_quizes", { cursor }),
    joinQuizAndGetInfo: (quizId: string): Promise<any> =>
      connection.fetch("join_quiz_and_get_info", { quizId }),
  },
  mutation: {
    follow: (userId: string, value: boolean): Promise<any> =>
      connection.fetch("follow", { userId, value }),
    block: (userId: string, value: boolean): Promise<any> =>
      connection.fetch("block", { userId, value }),
    editProfile: (data: {
      displayName: string;
      username: string;
      bio: string;
    }): Promise<any> => connection.fetch("edit_profile", { data }),
    createQuiz: (data: {
      name: string;
      privacy: string;
      description: string;
    }): Promise<void> => connection.fetch("create_quiz", data) as any,
    leaveQuiz: (): Promise<any> =>
      connection.fetch("leave_quiz", {}, "you_left_quiz"),
  },
});
