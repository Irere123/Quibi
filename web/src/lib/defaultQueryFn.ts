import { apiBaseUrl } from "./constants";

export const defaultQueryFn = async ({ queryKey }: { queryKey: string }) => {
  const r = await fetch(`${apiBaseUrl}${queryKey}`);

  if (r.status !== 200) {
    throw new Error(await r.text());
  }

  return await r.json();
};
