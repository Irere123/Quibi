import React from "react";
import ReactModal from "react-modal";
import Router from "next/router";
import NProgress from "nprogress";
import Head from "next/head";
import { AppProps } from "next/app";
import { QueryClientProvider } from "react-query";
import { PageComponent } from "../types/PageComponent";
import { isServer } from "../lib/isServer";
import { init_i18n } from "../lib/i18n";
import { queryClient } from "../lib/queryClient";
import "../styles/globals.css";
import "nprogress/nprogress.css";
import { KeybindListener } from "../modules/keyboard-shotcuts/KeybindListener";
import { ConfirmModal } from "../shared-components/ConfirmModal";
import { ErrorToastController } from "../modules/errors/ErrorToastController";
import { PromptModal } from "../shared-components/PromptModal";
import { WebSocketProvider } from "../modules/ws/WebSocketProvider";
import { WsMainHandlerProvider } from "../hooks/useWsMainHandler";
import { SoundEffectPlayer } from "../modules/sound-effects/SoundEffectPlayer";
import { InvitedToJoinQuizModal } from "../shared-components/InvitedToJoinQuizModal";

if (!isServer) {
  init_i18n();
}

Router.events.on("routeChangeStart", () => {
  NProgress.start();
});
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

ReactModal.setAppElement("#__next");

function App({ Component, pageProps }: AppProps) {
  if (
    isServer &&
    !Component.getInitialProps &&
    (Component as PageComponent<unknown>).ws
  ) {
    return null;
  }

  return (
    <WebSocketProvider
      shouldConnect={!!(Component as PageComponent<unknown>).ws}
    >
      <QueryClientProvider client={queryClient}>
        <WsMainHandlerProvider>
          <Head>
            <link rel="icon" href="/favicon.ico" type="image/x-icon" />
            <link rel="manifest" href="/manifest.json" />
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1, user-scalable=no, user-scalable=0"
            />
          </Head>
          <Component {...pageProps} />
          <SoundEffectPlayer />
          <ErrorToastController />
          <KeybindListener />
          <InvitedToJoinQuizModal />
          <ConfirmModal />
          <PromptModal />
        </WsMainHandlerProvider>
      </QueryClientProvider>
    </WebSocketProvider>
  );
}

export default App;
