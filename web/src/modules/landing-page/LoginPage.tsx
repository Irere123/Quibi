import React, { useCallback, useContext, useEffect } from "react";
import { Twitter, Google, Discord, Bug } from "../../icons";
import { HeaderController } from "../display/HeaderController";
import { useTypeSafeTranslation } from "../../hooks/useTypeSafeTranslation";
import { apiBaseUrl, loginNextPathKey, __prod__ } from "../../lib/constants";
import { useRouter } from "next/router";
import { useTokenStore } from "../auth/useTokenStore";
import { isServer } from "../../lib/isServer";
import { useSaveTokensFromQueryParams } from "../auth/useSaveTokensFromQueryParams";
import { WebSocketContext } from "../ws/WebSocketProvider";

interface LoginButtonProps {
  dev?: boolean;
  children: [React.ReactNode, React.ReactNode];
  oauthUrl?: string;
  onClick?: () => void;
}

const LoginButton: React.FC<LoginButtonProps> = ({
  oauthUrl,
  children,
  dev,
  onClick,
}) => {
  const { query } = useRouter();
  const clickHandler = useCallback(() => {
    if (typeof query.next === "string" && query.next) {
      try {
        localStorage.setItem(loginNextPathKey, query.next);
      } catch {}
    }

    window.location.href = oauthUrl as string;
  }, [oauthUrl, query]);

  return (
    <button
      className={`flex items-center gap-3 ${
        dev
          ? "bg-secondary-300 text-primary-900"
          : "bg-primary-700 hover:bg-primary-600 text-primary-200"
      } rounded justify-center py-2 mt-1`}
      onClick={oauthUrl ? clickHandler : onClick}
    >
      <span>{children[0]}</span>
      {children[1]}
    </button>
  );
};

export const LoginPage: React.FC = () => {
  useSaveTokensFromQueryParams();
  const hasTokens = useTokenStore((s) => !!(s.accessToken && s.refreshToken));
  const { t } = useTypeSafeTranslation();
  const { setConn } = useContext(WebSocketContext);
  const { push } = useRouter();

  useEffect(() => {
    setConn(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (hasTokens) {
      push("/dash");
    }
  }, [hasTokens, push]);

  const queryParams = !isServer
    ? "?redirect_after_base=" + window.location.origin
    : "";

  return (
    <div
      className="grid w-full h-full"
      style={{
        gridTemplateRows: "1fr auto 1fr",
        background: "url('/Group.svg')",
      }}
    >
      <HeaderController embed={{}} title="Login" />
      <div className="hidden sm:flex" />
      <div className="flex justify-self-center self-center sm:hidden">
        <h3 className="text-secondary-300 text-5xl">Quibi</h3>
      </div>
      <div className="flex justify-center items-center w-full">
        <div className="landingPage__loginCard bg-secondary-300 py-7 px-6 shadow-2xl">
          <div className="flex gap-2 flex-col">
            <span className="text-3xl font-bold text-primary-100">Welcome</span>
            <div className="flex-wrap text-primary-200">
              By logging in you accept our&nbsp;
              <a
                href="/privacy-policy.html"
                className="text-accent hover:underline"
              >
                Privacy Policy
              </a>
              &nbsp;and&nbsp;
              <a href="/terms.html" className="text-accent hover:underline">
                Terms of Service
              </a>
              .
            </div>
          </div>
          <div className="flex flex-col gap-4 mt-4">
            <LoginButton
              oauthUrl={`${apiBaseUrl}/auth/google/web${queryParams}`}
            >
              <Google />
              Login with Google
            </LoginButton>
            <LoginButton
              oauthUrl={`${apiBaseUrl}/auth/discord/web${queryParams}`}
            >
              <Discord />
              Login with Discord
            </LoginButton>
            <LoginButton
              oauthUrl={`${apiBaseUrl}/auth/twitter/web${queryParams}`}
            >
              <Twitter />
              Login with Twitter
            </LoginButton>
            {!__prod__ ? (
              <LoginButton
                dev
                onClick={async () => {
                  const username = window.prompt("Username");

                  if (!username) {
                    return;
                  }
                  const r = await fetch(
                    `${apiBaseUrl}/dev/test-info?username=` + username
                  );
                  const d = await r.json();
                  useTokenStore.getState().setTokens({
                    accessToken: d.accessToken,
                    refreshToken: d.refreshToken,
                  });
                  push("/dash");
                }}
              >
                <Bug width={20} height={20} />
                Create a test user
              </LoginButton>
            ) : null}
          </div>
        </div>
      </div>
      <div className="flex flex-row absolute bottom-0 w-full justify-between px-5 py-5 mt-auto items-center sm:px-7">
        <div className="hidden sm:flex">
          <h3 className="text-secondary-300">Quibi</h3>
        </div>
        <div className="flex flex-row gap-3 text-secondary-300">
          <a href="/blog" className="ml-2">
            Blog
          </a>
          <a href="/developer" className="ml-2">
            {t("footer.link_1")}
          </a>
          <a href="/help" className="ml-2">
            {t("footer.link_2")}
          </a>
        </div>
      </div>
    </div>
  );
};
