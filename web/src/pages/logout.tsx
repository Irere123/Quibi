import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useTokenStore } from "../modules/auth/useTokenStore";
import { ButtonLink } from "../ui/ButtonLink";

interface LogoutProps {}

const LogoutPage: React.FC<LogoutProps> = () => {
  const [hasTokens, setTokens] = useTokenStore((s) => [
    !!(s.accessToken && s.refreshToken),
    s.setTokens,
  ]);
  const { replace } = useRouter();
  useEffect(() => {
    if (!hasTokens) {
      replace("/");
    }
  }, [hasTokens, replace]);
  return (
    <ButtonLink
      onClick={() => setTokens({ accessToken: "", refreshToken: "" })}
    >
      click here if you are not automatically redirected
    </ButtonLink>
  );
};

export default LogoutPage;
