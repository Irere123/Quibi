import { Http } from "./raw";

export const wrap = (http: Http) => {
  return {
    testUser: (username: string) => {
      http.request("GET", `/dev/test-info?username=${username}`) as Promise<{
        accessToken: string;
        refreshToken: string;
      }>;
    },
  };
};
