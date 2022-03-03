import "../styles/globals.css";
import type { AppProps } from "next/app";
import SettingsContext from "contexts/SettingsContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SettingsContext>
      <Component {...pageProps} />
    </SettingsContext>
  );
}

export default MyApp;
