import { Connection } from "./raw";
import {
  ChatMode,
  JoinQuizAndGetInfoResponse,
  Quiz,
  QuizChatMessageToken,
  User,
} from "./types";

/**
 * Allows you to handle custom logic on websocket events
 */
type Handler<Data> = (data: Data) => void;

/**
 * A wrapper object created using `wrap()` that can be used to make websocket calls using functions
 */
export type Wrapper = ReturnType<typeof wrap>;

/**
 * Creates a wrapper object that allows you to make websocket calls using functions
 * @param {Connection} connection reference to the websocket connection
 * @returns  {connection} Wrapper object
 */
export const wrap = (connection: Connection) => ({
  connection,
  /**
   * Allows you to subscribe to various pre-defined websocket events
   */
  subscribe: {},
  /**
   * Allows you to call functions that return information about the ws state
   */

  query: {
    search: (
      query: string
    ): Promise<{
      items: Array<User | Quiz>;
      quizes: Quiz[];
      users: User[];
    }> => connection.sendCall("misc:search", { query }) as any,
    getFollowList: (
      username: string,
      isFollowing: boolean,
      cursor = 0
    ): Promise<{
      users: User[];
      nextCursor: number | null;
    }> =>
      connection.sendCall("user:get_followers", {
        username,
        isFollowing,
        cursor,
      }) as any,
    joinQuizAndGetInfo: (
      quizId: string
    ): Promise<JoinQuizAndGetInfoResponse | { error: string }> =>
      connection.sendCall("quiz:join", { quizId }) as any,
    getTopPublicQuizes: (cursor = 0): Promise<any> =>
      connection.sendCall("quiz:get_top", { cursor }),
    getMyFollowing: (
      cursor = 0
    ): Promise<{
      users: User[];
      nextCursor: number | null;
    }> => connection.sendCall("user:get_following", { cursor }) as any,
    getUserProfile: (
      userIdOrUsername: string
    ): Promise<User | null | { error: string }> =>
      connection.sendCall("user:get_info", {
        userIdOrUsername,
      }) as any,
  },
  /**
   * Allows you to call functions that mutate the ws state
   */
  mutation: {
    userUpdate: (data: Partial<User>): Promise<any> =>
      connection.sendCall("user:update", data),
    quizUpdate: (data: {
      name?: string;
      privacy?: string;
      chatThrottle?: number;
      description?: string;
      autoSpeaker?: boolean;
      chatMode?: ChatMode;
    }): Promise<any> => connection.sendCall("quiz:update", data),
    userBlock: (userId: string): Promise<any> =>
      connection.sendCall("user:block", { userId }),
    userUnblock: (userId: string): Promise<any> =>
      connection.sendCall("user:unblock", { userId }),
    ban: (username: string, reason: string) =>
      connection.sendCall(`user:ban`, { username, reason }),
    follow: (userId: string): Promise<any> =>
      connection.sendCall("user:follow", { userId }),
    unFollow: (userId: string): Promise<any> =>
      connection.sendCall("user:unfollow", { userId }),
    editProfile: (data: {
      displayName: string;
      username: string;
      bio: string;
    }): Promise<{ isUsernameTaken: boolean }> =>
      connection.sendCall("user:update", { data }) as any,
    createQuiz: (data: {
      name: string;
      privacy: string;
      description: string;
    }): Promise<{ error: string } | { quiz: Quiz }> =>
      connection.sendCall("quiz:create", data) as any,

    leaveQuiz: () => connection.sendCall("quiz:leave", {}, "user_left_quiz"),
    deleteQuizChatMessage: (userId: string, messageId: string): Promise<void> =>
      connection.sendCast("quiz_chat:delete", {
        userId,
        messageId,
      }) as any,
    sendQuizChatMsg: (ast: QuizChatMessageToken[]): Promise<void> =>
      connection.send("send_quiz_chat_msg", { tokens: ast }) as any,
    unbanFromQuizChat: (userId: string): Promise<void> =>
      connection.sendCast("quiz_chat:unban", { userId }) as any,
    banFromQuizChat: (userId: string): Promise<void> =>
      connection.sendCast("quiz_chat:ban", { userId }) as any,
  },
});
