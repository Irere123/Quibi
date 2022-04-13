import type { AppProps } from "next/app";
import ReactModal from "react-modal";
import Router from "next/router";
import NProgress from "nprogress";
import { QueryClientProvider } from "react-query";
import { isServer } from "../lib/isServer";
import { init_i18n } from "../lib/i18n";
import { queryClient } from "../lib/queryClient";
import "../styles/globals.css";
import "nprogress/nprogress.css";
import { KeybindListener } from "../modules/keyboard-shotcuts/KeybindListener";

if (!isServer) {
  init_i18n();
}

Router.events.on("routeChangeStart", () => {
  NProgress.start();
});
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

ReactModal.setAppElement("#__next");

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <KeybindListener />
      <Component {...pageProps} />
    </QueryClientProvider>
  );
}

export default MyApp;
