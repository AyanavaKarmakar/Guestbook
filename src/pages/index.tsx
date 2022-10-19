import type { NextPage } from "next";
import { signIn, signOut, useSession } from "next-auth/react";
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
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <main className="flex flex-col items-center pt-4">Loading...</main>;
  }

  function handleGitHubSignIn() {
    signIn("github");
  }

  function handleSignOut() {
    signOut();
  }

  return (
    <main className="flex flex-col items-center">
      <h1 className="pt-4 text-3xl">Guestbook</h1>

      <div className="pt-10">
        {session ? (
          <div>
            <p>Hi, {session.user?.name}!</p>

            <button onClick={handleSignOut}>Logout</button>

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
