import { Connection } from "./raw";

export const wrap = (connection: Connection) => ({
  connection,
  subscribe: {},
  query: {
    search: (query: string): Promise<any> =>
      connection.fetch("search", { query }),
    getUserProfile: (idOrUsername: string): Promise<any> =>
      connection.fetch("get_user_profile", { userIdOrUsername: idOrUsername }),
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
  },
});
