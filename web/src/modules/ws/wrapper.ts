import { Connection } from "./createWebSocket";

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
 * @param connection - reference to the websocket connection
 * @returns Wrapper object
 */

export const wrap = (connection: Connection) => ({
  connection,
  /**
   * Allows you to subscribe to various pre-defined websocket events
   */
  subscribe: {
    newChatMsg: (handler: Handler<{ userId: any; msg: any }>) =>
      connection.addListener("new_chat_msg", handler),
  },

  /**
   * Allows you to call functions that return information about the ws state
   */
  query: {
    search: (
      query: string
    ): Promise<{
      items: Array<any>;
      users: any[];
    }> => connection.fetch("search", { query }) as any,
    getUserProfile: (
      idOrUsername: string
    ): Promise<any | null | { error: string }> =>
      connection.fetch("get_user_profile", { userId: idOrUsername }),
    getUsersOnline: (userId: string): Promise<any | null | { error: string }> =>
      connection.fetch("get_online", { userId }),
    getMyFollowing: (
      cursor = 0
    ): Promise<{
      users: any[];
      nextCursor: number | null;
    }> => connection.fetch("get_my_following", { cursor }) as any,
    getFollowList: (
      username: string,
      isFollowing: boolean,
      cursor = 0
    ): Promise<{
      users: any[];
      nextCursor: number | null;
    }> =>
      connection.fetch("get_follow_list", {
        username,
        isFollowing,
        cursor,
      }) as any,
  },
  /**
   * Allows you to call functions that mutate the ws state
   */
  mutation: {
    userUpdate: (data: Partial<unknown>): Promise<unknown> =>
      connection.sendCall("user:update", data),
    editProfile: (data: Partial<unknown>): Promise<unknown> =>
      connection.sendCall("user:update", data),
    createRoom: (data: {
      name: string;
      privacy: string;
      type: string;
    }): Promise<any> => connection.fetch("create_room", data) as any,
    follow: (userId: string, value: boolean): Promise<void> =>
      connection.fetch("follow", { userId, value }) as any,
  },
});
