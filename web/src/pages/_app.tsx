import React, { useState } from "react";
import ReactModal from "react-modal";
import Router from "next/router";
import NProgress from "nprogress";
import { QueryClientProvider } from "react-query";
import { PageComponent } from "../types/PageComponent";
import { isServer } from "../lib/isServer";
import { init_i18n } from "../lib/i18n";
import { queryClient } from "../lib/queryClient";
import "../styles/globals.css";
import "nprogress/nprogress.css";
import { KeybindListener } from "../modules/keyboard-shotcuts/KeybindListener";
import { ConfirmModal } from "../ui/ConfirmModal";
import { ErrorToastController } from "../modules/errors/ErrorToastController";
import { useSocketStatus } from "../stores/useSocketStatus";
import { useTokenStore } from "../modules/auth/useTokenStore";
import { createWebSocket } from "../modules/ws/createWebSocket";
import { WsKilledMessage } from "../ui/WsKilledMessage";

if (!isServer) {
  init_i18n();
}

Router.events.on("routeChangeStart", () => {
  NProgress.start();
});
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

ReactModal.setAppElement("#__next");

function App({ Component, pageProps }: any) {
  const hasTokens = useTokenStore((s) => !!s.accessToken && !!s.refreshToken);
  const wsKilledByServer = useSocketStatus(
    (s) => s.status === "closed-by-server"
  );

  useState(() => (hasTokens ? createWebSocket() : null));
  if (!isServer && hasTokens) {
    createWebSocket();
  }

  if (
    isServer &&
    !Component.getInitialProps &&
    (Component as PageComponent<unknown>).ws
  ) {
    return null;
  }

  if (wsKilledByServer) {
    return <WsKilledMessage />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <KeybindListener />
      <ErrorToastController />
      <Component {...pageProps} />
      <ConfirmModal />
    </QueryClientProvider>
  );
}

export default App;
