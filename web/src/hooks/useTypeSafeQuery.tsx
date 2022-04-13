import { useQuery, UseQueryOptions } from "react-query";
import { apiBaseUrl } from "../lib/constants";
import { isServer } from "../lib/isServer";

type Keys = string;

export const useTypeSafeQuery = <K extends Keys>(
  key: K,
  opts?: UseQueryOptions
) => {
  return useQuery<any>(
    key,
    async () => {
      const r = await fetch(`${apiBaseUrl}/${key}`);

      if (r.status !== 200) {
        throw new Error(await r.text());
      }

      return await r.json();
    },
    {
      enabled: !isServer,
      ...opts,
    } as any
  );
};
