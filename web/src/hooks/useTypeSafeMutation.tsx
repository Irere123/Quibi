import { UseMutationOptions, useMutation } from "react-query";
import { apiBaseUrl } from "../lib/constants";

type Keys = string;

export const useTypeSafeMutation = <K extends Keys>(
  key: K,
  opts?: UseMutationOptions
) => {
  return useMutation<any>(
    key,
    async () => {
      const r = await fetch(`${apiBaseUrl}/${key}`, { method: "POST" });

      if (r.status !== 200) {
        throw new Error(await r.text());
      }

      return await r.json();
    },
    opts
  );
};
