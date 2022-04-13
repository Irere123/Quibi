import React from "react";

import { apiBaseUrl } from "../../lib/constants";
import { Twitter, Google, Discord } from "../../icons";
import { HeaderController } from "../components/HeaderController";
import { useTypeSafeTranslation } from "../../hooks/useTypeSafeTranslation";

interface LoginButtonProps {
  children: [React.ReactNode, React.ReactNode];
  oauthUrl: string;
}

const LoginButton: React.FC<LoginButtonProps> = ({ oauthUrl, children }) => {
  return (
    <button
      className="flex items-center gap-3 border-2 border-black rounded justify-center text-base py-2 mt-2"
      onClick={() => {
        window.location.href = `${apiBaseUrl}${oauthUrl}`;
      }}
    >
      <span>{children[0]}</span>
      {children[1]}
    </button>
  );
};

export const LoginPage: React.FC = () => {
  const { t } = useTypeSafeTranslation();

  return (
    <div
      className="grid w-full h-full"
      style={{ gridTemplateRows: "1fr auto 1fr" }}
    >
      <HeaderController embed={{}} title="Login" />
      <div className="hidden sm:flex" />
      <div className="flex justify-self-center self-center sm:hidden">
        <h3>Quibi</h3>
      </div>
      <div className="flex justify-center items-center w-full">
        <div className="landingPage__loginCard bg-primary-300 py-7 px-6 shadow-lg">
          <div className="flex gap-2 flex-col">
            <span className="text-3xl font-bold">Welcome</span>
            <div className="flex-wrap">
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
            <LoginButton oauthUrl="/auth/google">
              <Google />
              Login with Google
            </LoginButton>
            <LoginButton oauthUrl="/auth/discord">
              <Discord />
              Login with Discord
            </LoginButton>
            <LoginButton oauthUrl="/auth/twitter">
              <Twitter />
              Login with Twitter
            </LoginButton>
          </div>
        </div>
      </div>
      <div className="flex flex-row absolute bottom-0 w-full justify-between px-5 py-5 mt-auto items-center sm:px-7">
        <div className="hidden sm:flex">
          <h3>Quibi</h3>
        </div>
        <div className="flex flex-row gap-3">
          <p>English (US)</p>
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
