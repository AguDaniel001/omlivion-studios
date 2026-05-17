import type { AppProps } from "next/app";
import "@/app/globals.css";
import AppShell from "@/app/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AppShell>
      <Component {...pageProps} />
    </AppShell>
  );
}
