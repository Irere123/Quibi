import { Connection } from "./raw";
import { Quiz, User } from "./types";

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
    userBlock: (userId: string): Promise<any> =>
      connection.sendCall("user:block", { userId }),
    userUnblock: (userId: string): Promise<any> =>
      connection.sendCall("user:unblock", { userId }),
    ban: (username: string, reason: string) =>
      connection.sendCall(`user:ban`, { username, reason }),
    follow: (userId: string, value: boolean): Promise<any> =>
      connection.sendCall("user:follow", { userId, value }),
    editProfile: (data: {
      displayName: string;
      username: string;
      bio: string;
    }): Promise<{ isUsernameTaken: boolean }> =>
      connection.sendCall("user:update", { data }) as any,
  },
});
