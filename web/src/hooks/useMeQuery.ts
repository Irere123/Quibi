import { useQuery } from "react-query";
import { auth_query } from "../modules/ws/createWebSocket";
import { User } from "../modules/ws/types";

export const useMeQuery = () => {
  const { data } = useQuery<{ user: User }>(auth_query, {
    notifyOnChangeProps: ["data"],
    enabled: false,
  });

  return { me: data?.user };
};
