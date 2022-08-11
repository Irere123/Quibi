import { useQuery, UseQueryOptions } from "react-query";
import { isServer } from "../lib/isServer";
import { wsFetch } from "../modules/ws/createWebSocket";
import { useSocketStatus } from "../stores/useSocketStatus";

export const useTypeSafeQuery = (
  op: string,
  data?: any,
  opts?: UseQueryOptions
) => {
  const { status } = useSocketStatus();

  return useQuery(op, () => wsFetch<any>({ d: data, op }), {
    enabled: status === "auth-good" && !isServer,
    ...opts,
  } as any);
};
