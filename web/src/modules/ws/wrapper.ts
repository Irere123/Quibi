import { Connection } from "./raw";
import { Quiz, User } from "./types";

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
    getMyFollowing: (limit = 7): Promise<any> =>
      connection.fetch("get_my_following", { limit }),
    getInviteList: (cursor = 0): Promise<any> =>
      connection.fetch("get_invite_list", { cursor }),
    joinQuizAndGetInfo: (quizId: string): Promise<any> =>
      connection.fetch("join_quiz_and_get_info", { quizId }),
    getBlockedFromQuizUsers: (
      cursor = 0
    ): Promise<{
      users: User[];
      nextCursor: number | null;
    }> =>
      connection.fetch("get_blocked_from_quiz_users", {
        offset: cursor,
      }) as any,
  },
  mutation: {
    follow: (userId: string, value: boolean): Promise<any> =>
      connection.fetch("follow", { userId, value }),
    block: (userId: string, value: boolean): Promise<any> =>
      connection.fetch("block", { userId, value }),

    setAutoSpeaker: (value: boolean) =>
      connection.send(`set_auto_speaker`, { value }),

    setQuizChatMode: (value: boolean) =>
      connection.send(`set_quiz_chat_mode`, { value }),
    inviteToQuiz: (userId: string) =>
      connection.send("invite_to_quiz", { userId }),
    deleteQuizChatMessage: (userId: string, messageId: string): Promise<void> =>
      connection.send("delete_quiz_chat_message", { userId, messageId }) as any,
    blockFromQuiz: (userId: string): Promise<void> =>
      connection.send("block_from_quiz", { userId }) as any,
    unbanFromQuiz: (userId: string): Promise<any> =>
      connection.fetch("unban_from_quiz", { userId }),
    unbanFromQuizChat: (userId: string): Promise<void> =>
      connection.send("unban_from_quiz_chat", { userId }) as any,
    banFromQuizChat: (userId: string): Promise<void> =>
      connection.send("ban_from_quiz_chat", { userId }) as any,

    editProfile: (data: {
      displayName: string;
      username: string;
      bio: string;
    }): Promise<any> => connection.fetch("edit_profile", { data }),
    createQuiz: (data: {
      name: string;
      privacy: string;
      description: string;
    }): Promise<{ error: string } | { quiz: Quiz }> =>
      connection.fetch("create_quiz", data) as any,
    editQuiz: (data: {
      name?: string;
      privacy?: string;
      description?: string;
    }): Promise<{ error: string } | { quiz: Quiz }> =>
      connection.fetch("edit_quiz", data) as any,
    leaveQuiz: (): Promise<any> =>
      connection.fetch("leave_quiz", {}, "you_left_quiz"),

    createRoom: (data: {
      name: string;
      isPrivate: boolean;
    }): Promise<{ error: string } | { room: any }> =>
      connection.fetch("create_room", data) as any,
  },
});
