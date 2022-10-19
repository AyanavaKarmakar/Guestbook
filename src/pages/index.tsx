import type { NextPage } from "next";
import { signIn, signOut, useSession } from "next-auth/react";
import { ChangeEvent, FormEvent, useState } from "react";
import { trpc } from "../utils/trpc";

const Messages = () => {
  const { data: messages, isLoading } = trpc.guestbook.getAll.useQuery();

  if (isLoading === true) {
    return <div>Fetching Messages...</div>;
  }

  return (
    <div className="flex flex-col gap-4">
      <h2>
        <u>Messages</u>
      </h2>
      {messages?.map((msg, index) => {
        return (
          <div key={index}>
            <p>{msg.message}</p>
            <span>- {msg.name}</span>
          </div>
        );
      })}
    </div>
  );
};

const Home: NextPage = () => {
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

  if (status === "loading") {
    return <main className="flex flex-col items-center pt-4">Loading...</main>;
  }

  function handleGitHubSignIn() {
    signIn("github");
  }

  function handleSignOut() {
    signOut();
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
    <main className="flex flex-col items-center">
      <h1 className="pt-4 text-3xl">Guestbook</h1>

      <div className="pt-10">
        {session ? (
          <div>
            <p>Hi, {session.user?.name}!</p>

            <button onClick={handleSignOut}>Logout</button>

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
                  className="rounded-md border-2 border-zinc-800 bg-neutral-900 px-4 py-2 focus:outline-none"
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
            <button onClick={handleGitHubSignIn}>Login with GitHub</button>

            <div className="pt-10">
              <Messages />
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default Home;
