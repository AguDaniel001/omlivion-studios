import type { AppProps } from "next/app";
import { Montserrat } from "next/font/google";
import localFont from "next/font/local";
import "@/app/globals.css";
import AppShell from "@/app/app";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-montserrat",
  display: "swap",
});

const neuePlak = localFont({
  src: [
    { path: "../public/fonts/neueplak/NeuePlakText-Thin.woff2", weight: "100", style: "normal" },
    { path: "../public/fonts/neueplak/NeuePlakText-ThinItalic.woff2", weight: "100", style: "italic" },
    { path: "../public/fonts/neueplak/NeuePlakText-Light.woff2", weight: "300", style: "normal" },
    { path: "../public/fonts/neueplak/NeuePlakText-LightItalic.woff2", weight: "300", style: "italic" },
    { path: "../public/fonts/neueplak/NeuePlakText-Italic.woff2", weight: "400", style: "italic" },
    { path: "../public/fonts/neueplak/NeuePlakText-SemiBold.woff2", weight: "600", style: "normal" },
    { path: "../public/fonts/neueplak/NeuePlakText-SemiBoldItalic.woff2", weight: "600", style: "italic" },
    { path: "../public/fonts/neueplak/NeuePlakText-Bold.woff2", weight: "700", style: "normal" },
    { path: "../public/fonts/neueplak/NeuePlakText-BoldItalic.woff2", weight: "700", style: "italic" },
    { path: "../public/fonts/neueplak/NeuePlakText-Black.woff2", weight: "900", style: "normal" },
    { path: "../public/fonts/neueplak/NeuePlakText-BlackItalic.woff2", weight: "900", style: "italic" },
  ],
  variable: "--font-neueplak",
  display: "swap",
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={`${montserrat.variable} ${neuePlak.variable}`}>
      <AppShell>
        <Component {...pageProps} />
      </AppShell>
    </div>
  );
}
