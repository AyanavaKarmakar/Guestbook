import { Session } from "next-auth";
import { signIn, signOut } from "next-auth/react";
import Image from "next/image";

interface Props {
  userName?: string | null;
  userImage?: string | null;
  session: Session | null;
}

export const Navbar = (props: Props) => {
  const { userName, userImage, session } = props;

  function handleGitHubSignIn() {
    signIn("github");
  }

  function handleSignOut() {
    signOut();
  }

  return (
    <div className="navbar bg-gradient-to-r from-indigo-600 bg-auto">
      <div className="navbar-start">
        <h1 className="font-mono text-4xl font-extrabold uppercase tracking-wider text-white subpixel-antialiased">
          <span className="bg-gradient-to-r from-violet-100 to-cyan-200 bg-clip-text text-transparent">
            Guestbook
          </span>
        </h1>
      </div>
      {session ? (
        <>
          <div className="navbar-center">
            <h2 className="font-mono text-xl font-semibold tracking-wider text-white subpixel-antialiased">
              {userName}
            </h2>
          </div>
          {userImage !== null && userImage !== undefined && (
            <div className="navbar-end">
              <div className="dropdown-end dropdown">
                <label tabIndex={0} className="avatar btn btn-ghost btn-circle">
                  <div className="w-10 rounded-full">
                    <Image src={userImage} alt="avatar" layout="fill" />
                  </div>
                </label>
                <ul
                  tabIndex={0}
                  className="dropdown-content menu rounded-box menu-compact mt-3 w-52 p-2 shadow"
                >
                  <li className="bg-error bg-gradient-to-r from-red-900 text-white">
                    <a className="btn btn-ghost" onClick={handleSignOut}>
                      Logout
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="navbar-end">
          <button
            onClick={handleGitHubSignIn}
            className="btn btn-outline btn-success"
          >
            Login
          </button>
        </div>
      )}
    </div>
  );
};
