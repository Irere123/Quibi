import { useRouter } from "next/router";
import { useEffect } from "react";
import { loginNextPathKey } from "../../lib/constants";
import { useTokenStore } from "./useTokenStore";

export const useSaveTokensFromQueryParams = () => {
  const { query: params, push } = useRouter();

  useEffect(() => {
    if (
      typeof params.accessToken === "string" &&
      typeof params.refreshToken === "string" &&
      params.accessToken &&
      params.refreshToken
    ) {
      useTokenStore.getState().setTokens({
        accessToken: params.accessToken,
        refreshToken: params.refreshToken,
      });

      let nextPath = "/dash";

      try {
        const possibleNextPath = localStorage.getItem(loginNextPathKey);
        if (possibleNextPath && possibleNextPath.startsWith("/")) {
          nextPath = possibleNextPath;
          localStorage.setItem(loginNextPathKey, "");
        }
      } catch {}
      push(nextPath);
    }
  }, [params, push]);
};
