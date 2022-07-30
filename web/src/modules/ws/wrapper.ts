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
    getUserProfile: (
      idOrUsername: string
    ): Promise<any | null | { error: string }> =>
      connection.fetch("get_user_profile", { userId: idOrUsername }),
  },
  /**
   * Allows you to call functions that mutate the ws state
   */
  mutation: {
    userUpdate: (data: Partial<unknown>): Promise<unknown> =>
      connection.sendCall("user:update", data),
    editProfile: (data: Partial<unknown>): Promise<unknown> =>
      connection.sendCall("user:update", data),
  },
});
