import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { Alert, Footer, Messages, Navbar } from "../components";
import { z } from "zod";
import { useMobileDeviceStore } from "../utils/store";
import { TypeAnimation } from "react-type-animation";
import Head from "next/head";

const PropsValidator = z.object({
  userAgent: z.string().optional(),
});

type Props = z.infer<typeof PropsValidator>;

const Home: NextPage = (props: Props) => {
  /**
   * ? Used for validating device type
   */
  const { userAgent } = props;
  /**
   * ? Checks if device type is mobile or not
   */
  const regexp = /android|iphone|kindle|ipad/i;
  const setIsMobileDevice = useMobileDeviceStore(
    (state) => state.setIsMobileDevice
  );
  const { data: session, status } = useSession();

  useEffect(() => {
    if (userAgent !== undefined) {
      setIsMobileDevice(regexp.test(userAgent));
    }
  });

  if (status === "loading") {
    return (
      <>
        <Head>
          <title>GUESTBOOK — Loading</title>
          <meta
            property="og:title"
            content="GUESTBOOK — Loading"
            key="title_0"
          />
        </Head>
        <main className="flex h-screen items-center justify-center font-mono text-3xl font-semibold tracking-wider text-white subpixel-antialiased">
          Loading
          <TypeAnimation
            sequence={[" ", 62, ".", 125, "..", 250, "...", 500]}
            wrapper="div"
            cursor={false}
            repeat={Infinity}
          />
        </main>
      </>
    );
  }

  return (
    <>
      {status === "authenticated" ? (
        <Head>
          <title>GUESTBOOK — Signed In</title>
          <meta
            property="og:title"
            content="GUESTBOOK — Signed In"
            key="title_1"
          />
        </Head>
      ) : (
        <Head>
          <title>GUESTBOOK — Home</title>
          <meta property="og:title" content="GUESTBOOK — Home" key="title_2" />
        </Head>
      )}
      <header className="sticky top-0 z-50">
        <Navbar
          session={session}
          status={status}
          userName={session?.user?.name}
          userImage={session?.user?.image}
          userEmail={session?.user?.email}
        />
        <Alert session={session} />
      </header>
      <main className="relative flex flex-col items-center">
        <div className="pt-10">
          <div>
            <div className="mb-5 pt-10">
              <Messages />
            </div>
          </div>
        </div>
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
};

export default Home;

Home.getInitialProps = async ({ req }) => {
  const userAgent = (
    req ? req.headers["user-agent"] : navigator.userAgent
  ) as Props;
  return PropsValidator.parse({ userAgent });
};
