import { useCallback } from "react";
import { useQueryClient } from "react-query";
import { wsFetch } from "../modules/ws/createWebSocket";

export const useTypeSafePrefetch = () => {
  const client = useQueryClient();

  return useCallback(
    (op: any, data?: any) =>
      client.prefetchQuery(op, () => wsFetch({ d: data, op }), {
        staleTime: 0,
      }),
    [client]
  );
};
