import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import { ChangeEvent, FormEvent, useState, useEffect } from "react";
import { trpc } from "../utils/trpc";
import { Messages, Navbar } from "../components";
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
  const ctx = trpc.useContext();
  const { data: session, status } = useSession();
  const [message, setMessage] = useState("");
  const postMessage = trpc.guestbook.postMessage.useMutation({
    /**
     * ? Configure optimistic UI update
     * @see https://trpc.io/docs/v10/useContext#helpers
     */
    onMutate: () => {
      ctx.guestbook.getAll.cancel();
      const optimisticUpdate = ctx.guestbook.getAll.getData();

      if (optimisticUpdate) {
        ctx.guestbook.getAll.setData(optimisticUpdate);
      }
    },

    /**
     * @see https://trpc.io/docs/v10/useContext#invalidating-a-single-query
     */
    onSettled: () => {
      ctx.guestbook.getAll.invalidate();
    },
  });

  useEffect(() => {
    if (userAgent !== undefined) {
      setIsMobileDevice(regexp.test(userAgent));
    }
  });

  if (status === "loading") {
    return <main className="flex flex-col items-center pt-4">Loading...</main>;
  }

  function handleOnChange(event: ChangeEvent<HTMLInputElement>) {
    setMessage(event.target.value);
  }

  function handleFormSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (session?.user !== undefined) {
      postMessage.mutate({
        name: session?.user.name as string,
        message,
      });
    }

    setMessage("");
  }

  return (
    <>
      <header>
        <Navbar
          session={session}
          userName={session?.user?.name}
          userImage={session?.user?.image}
        />
      </header>
      <main className="flex flex-col items-center">
        <div className="pt-10">
          {session ? (
            <div>
              <div className="pt-6">
                <form
                  className="flex gap-2"
                  onSubmit={(event) => handleFormSubmit(event)}
                >
                  <input
                    type="text"
                    value={message}
                    placeholder="Your message..."
                    maxLength={100}
                    onChange={(event) => handleOnChange(event)}
                    className="bg-neutral-900 rounded-md border-2 border-zinc-800 px-4 py-2 focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="rounded-md border-2 border-zinc-800 p-2 focus:outline-none"
                  >
                    Submit
                  </button>
                </form>
              </div>

              <div className="pt-10">
                <Messages />
              </div>
            </div>
          ) : (
            <div>
              <div className="pt-10">
                <Messages />
              </div>
            </div>
          )}
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
