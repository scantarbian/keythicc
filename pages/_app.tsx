import "../styles/globals.css";
import type { AppProps } from "next/app";
import SettingsContext from "contexts/SettingsContext";
import { SessionProvider } from "next-auth/react";
import NextNProgress from "nextjs-progressbar";
import { SnackbarProvider } from "notistack";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <SnackbarProvider
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <SettingsContext className="absolute z-50">
          <NextNProgress />
          <Component {...pageProps} />
        </SettingsContext>
      </SnackbarProvider>
    </SessionProvider>
  );
}

export default MyApp;
