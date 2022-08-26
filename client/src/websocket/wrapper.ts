// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck because internet is unpredictable

import { Connection } from "./raw";
import {
  GetTopPublicQuizesResponse,
  JoinQuizAndGetInfoResponse,
} from "./responses";

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
  subscribe: {
    newChatMsg: (handler: Handler<{ userId: UUID; msg: Message }>) =>
      connection.addListener("new_chat_msg", handler),
    newQuizDetails: (handler: Handler<NewRoomDetailsResponse>) =>
      connection.addListener("new_quiz_details", handler),
    userJoinQuiz: (handler: Handler<{ user: User }>) =>
      connection.addListener("new_user_join_quiz", handler),
    userLeaveQuiz: (handler: Handler<{ userId: UUID; quizId: UUID }>) =>
      connection.addListener("user_left_quiz", handler),
    invitationToQuiz: (handler: Handler<InvitationToQuizResponse>) =>
      connection.addListener("invitation_to_quiz", handler),
    handRaised: (handler: Handler<{ userId: UUID }>) =>
      connection.addListener("hand_raised", handler),
    speakerAdded: (
      handler: Handler<{
        userId: UUID;
        muteMap: BooleanMap;
        deafMap: BooleanMap;
      }>
    ) => connection.addListener("speaker_added", handler),
    speakerRemoved: (
      handler: Handler<{
        userId: UUID;
        muteMap: BooleanMap;
        deafMap: BooleanMap;
      }>
    ) => connection.addListener("speaker_removed", handler),
  },
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
    }> => connection.sendCall("misc:search", { query }),
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
      }),
    getInviteList: (
      cursor = 0
    ): Promise<{
      users: User[];
      nextCursor: number | null;
    }> => connection.sendCall("quiz:get_invite_list", { cursor }),
    joinQuizAndGetInfo: (
      quizId: string
    ): Promise<JoinQuizAndGetInfoResponse | { error: string }> =>
      connection.sendCall("quiz:join", { quizId }),
    getTopPublicQuizes: (cursor = 0): Promise<GetTopPublicQuizesResponse> =>
      connection.sendCall("quiz:get_top", { cursor }),
    getMyFollowing: (
      cursor = 0
    ): Promise<{
      users: User[];
      nextCursor: number | null;
    }> => connection.sendCall("user:get_following", { cursor }),
    getUserProfile: (
      userIdOrUsername: string
    ): Promise<User | null | { error: string }> =>
      connection.sendCall("user:get_info", {
        userIdOrUsername,
      }),

    getBlockedFromQuizUsers: (
      cursor = 0
    ): Promise<{
      users: User[];
      nextCursor: number | null;
    }> => connection.sendCall("quiz:get_banned_users", { cursor }),
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
      connection.sendCall("user:update", data),
    createQuiz: (data: {
      name: string;
      privacy: string;
      description: string;
    }): Promise<{ error: string } | { quiz: Quiz }> =>
      connection.sendCall("quiz:create", data),

    leaveQuiz: (): Promise<void> => connection.sendCall("quiz:leave", {}),
    inviteToQuiz: (userId: string): Promise<void> =>
      connection.sendCast("quiz:invite", { userId }),
    deleteQuizChatMessage: (userId: string, messageId: string): Promise<void> =>
      connection.sendCast("quiz_chat:delete", {
        userId,
        messageId,
      }),
    sendQuizChatMsg: (ast: QuizChatMessageToken[]): Promise<void> =>
      connection.send("send_quiz_chat_msg", { tokens: ast }),
    unbanFromQuizChat: (userId: string): Promise<void> =>
      connection.sendCast("quiz_chat:unban", { userId }),
    banFromQuizChat: (userId: string): Promise<void> =>
      connection.sendCast("quiz_chat:ban", { userId }),
    banFromQuiz: (userId: string): Promise<any> =>
      connection.sendCast("quiz:ban", { userId }),
    unbanFromQuiz: (userId: string): Promise<any> =>
      connection.sendCall("quiz:unban", { userId }),
  },
});
