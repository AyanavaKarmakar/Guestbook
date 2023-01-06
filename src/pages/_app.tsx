// src/pages/_app.tsx
import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import type { Session } from "next-auth";
import type { AppType } from "next/app";
import { trpc } from "../utils/trpc";
import { Familjen_Grotesk } from "@next/font/google";

const defaultFont = Familjen_Grotesk({
  subsets: ["latin"],
});

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <main className={defaultFont.className}>
        <Component {...pageProps} />
      </main>
    </SessionProvider>
  );
};

export default trpc.withTRPC(MyApp);
