import type { NextPage } from "next";
import { signIn, signOut, useSession } from "next-auth/react";

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
    <main>
      <h1>Guestbook</h1>
      {session ? (
        <div>
          <p>Hi, {session.user?.name}!</p>

          <button onClick={handleSignOut}>Logout</button>
        </div>
      ) : (
        <div>
          <button onClick={handleGitHubSignIn}>Login with GitHub</button>
        </div>
      )}
    </main>
  );
};

export default Home;
