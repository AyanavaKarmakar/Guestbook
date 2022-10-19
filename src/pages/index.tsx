import type { NextPage } from "next";
import { signIn } from "next-auth/react";

const Home: NextPage = () => {
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
