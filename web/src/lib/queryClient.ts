import { QueryClient } from "react-query";
import { defaultQueryFn } from "./defaultQueryFn";

export const queryClient = new QueryClient({
  defaultOptions: {
    mutations: {
      onError: (e) => {
        if ("message" in (e as Error)) {
          console.error(e);
        }
      },
    },
    queries: {
      retry: false,
      staleTime: 60 * 1000 * 5,
      onError: (e) => {
        if ("message" in (e as Error)) {
          console.log(e);
        }
      },
      queryFn: defaultQueryFn as any,
    },
  },
});
