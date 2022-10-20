import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { Alert, Messages, Navbar } from "../components";
import { z } from "zod";
import { useMobileDeviceStore } from "../utils/store";

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
      <main className="flex h-screen items-center justify-center font-mono text-3xl font-semibold tracking-wider text-white subpixel-antialiased">
        Loading...
      </main>
    );
  }

  return (
    <>
      <header className="sticky top-0 z-50">
        <Navbar
          session={session}
          userName={session?.user?.name}
          userImage={session?.user?.image}
          userEmail={session?.user?.email}
        />
        <div className="mt-2 mb-2 ml-1 mr-1">
          <Alert session={session} />
        </div>
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
