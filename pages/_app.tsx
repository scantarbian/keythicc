import "../styles/globals.css";
import type { AppProps } from "next/app";
import SettingsContext from "contexts/SettingsContext";
import { SessionProvider } from "next-auth/react";
import NextNProgress from "nextjs-progressbar";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SettingsContext>
      <NextNProgress />
      <Component {...pageProps} />
    </SettingsContext>
  );
}

export default MyApp;
