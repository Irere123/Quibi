import React from "react";
import { Twitter, Google, Discord } from "../../icons";
import { HeaderController } from "../display/HeaderController";
import { useTypeSafeTranslation } from "../../hooks/useTypeSafeTranslation";

interface LoginButtonProps {
  children: [React.ReactNode, React.ReactNode];
  oauthUrl: string;
}

const LoginButton: React.FC<LoginButtonProps> = ({ oauthUrl, children }) => {
  return (
    <button
      className="flex items-center gap-3 bg-primary-700 hover:bg-primary-600 rounded justify-center text-primary-200 py-2 mt-2"
      onClick={() => {
        window.location.href = `${oauthUrl}`;
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
            <LoginButton oauthUrl="/dash">
              <Google />
              Login with Google
            </LoginButton>
            <LoginButton oauthUrl="/dash">
              <Discord />
              Login with Discord
            </LoginButton>
            <LoginButton oauthUrl="/dash">
              <Twitter />
              Login with Twitter
            </LoginButton>
          </div>
        </div>
      </div>
      <div className="flex flex-row absolute bottom-0 w-full justify-between px-5 py-5 mt-auto items-center sm:px-7">
        <div className="hidden sm:flex">
          <h3 className="text-secondary-300">Quibi</h3>
        </div>
        <div className="flex flex-row gap-3 text-secondary-300">
          <p>English</p>
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
