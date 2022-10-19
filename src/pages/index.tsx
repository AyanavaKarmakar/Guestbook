import type { NextPage } from "next";
import { signIn, signOut, useSession } from "next-auth/react";

const Home: NextPage = () => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <main>Loading...</main>;
  }

  function handleGitHubSignIn() {
    signIn("github");
  }

  return (
    <main>
      <h1>Guestbook</h1>
      <button onClick={handleGitHubSignIn}>Login with GitHub</button>
    </main>
  );
};

export default Home;
