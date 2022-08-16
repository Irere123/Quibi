import React from "react";
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
import { ConfirmModal } from "../shared-components/ConfirmModal";
import { ErrorToastController } from "../modules/errors/ErrorToastController";
import { PromptModal } from "../shared-components/PromptModal";
import { WebSocketProvoder } from "../modules/ws/WebSocketProvider";
import { WsMainHandlerProvider } from "../hooks/useWsMainHandler";
import { useCurrentQuizIdStore } from "../stores/useCurentQuizIdStore";
import { SoundEffectPlayer } from "../modules/sound-effects/SoundEffectPlayer";

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
  if (
    isServer &&
    !Component.getInitialProps &&
    (Component as PageComponent<unknown>).ws
  ) {
    return null;
  }

  console.log(useCurrentQuizIdStore.getState().currentQuizId);

  return (
    <WebSocketProvoder
      shouldConnect={!!(Component as PageComponent<unknown>).ws}
    >
      <QueryClientProvider client={queryClient}>
        <WsMainHandlerProvider>
          <SoundEffectPlayer />
          <KeybindListener />
          <ErrorToastController />
          <Component {...pageProps} />
          <ConfirmModal />
          <PromptModal />
        </WsMainHandlerProvider>
      </QueryClientProvider>
    </WebSocketProvoder>
  );
}

export default App;
