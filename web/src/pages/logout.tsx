import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useTokenStore } from "../modules/auth/useTokenStore";
import { Button } from "../ui/Button";
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
    <div className="flex w-full h-full flex-col items-center justify-center p-8">
      <h4 className="text-primary-100 mb-4">Something went wrong</h4>
      <Button
        size="medium"
        onClick={() => setTokens({ accessToken: "", refreshToken: "" })}
      >
        Retry
      </Button>
    </div>
  );
};

export default LogoutPage;
