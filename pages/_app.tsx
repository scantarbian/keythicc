import "../styles/globals.css";
import type { AppProps } from "next/app";
import SettingsProvider from "contexts/SettingsContext";
import CartProvider from "contexts/CartContext";
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
        autoHideDuration={3000}
      >
        <CartProvider>
          <SettingsProvider className="absolute z-50">
            <NextNProgress />
            <Component {...pageProps} />
          </SettingsProvider>
        </CartProvider>
      </SnackbarProvider>
    </SessionProvider>
  );
}

export default MyApp;
