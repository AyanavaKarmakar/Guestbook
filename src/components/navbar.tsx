import { Session } from "next-auth";
import { signIn, signOut } from "next-auth/react";
import Image from "next/image";
import { InfoIcon } from "../utils/icons";
import { useMobileDeviceStore } from "../utils/store";
import { Modal } from "./modal";

interface Props {
  userName?: string | null;
  userImage?: string | null;
  session: Session | null;
}

export const Navbar = (props: Props) => {
  const { userName, userImage, session } = props;
  const isMobileDevice = useMobileDeviceStore((state) => state.isMobileDevice);

  function handleGitHubSignIn() {
    signIn("github");
  }

  function handleRedditSignIn() {
    signIn("reddit");
  }

  function handleSignOut() {
    signOut();
  }

  return (
    <div className="navbar bg-gradient-to-r from-indigo-600 bg-auto">
      <div className="navbar-start">
        {isMobileDevice === true ? (
          <h1 className="ml-1 text-3xl font-bold uppercase tracking-widest text-white subpixel-antialiased">
            <span className="bg-gradient-to-r from-violet-100 to-cyan-300 bg-clip-text text-transparent">
              Guestbook
            </span>
          </h1>
        ) : (
          <h1 className="ml-1 text-4xl font-bold uppercase tracking-widest text-white subpixel-antialiased">
            <span className="bg-gradient-to-r from-violet-100 to-cyan-300 bg-clip-text text-transparent">
              Guestbook
            </span>
          </h1>
        )}
      </div>
      {session ? (
        <>
          {isMobileDevice !== true && (
            <div className="navbar-center">
              <h2 className="font-mono text-xl font-semibold tracking-widest text-white subpixel-antialiased">
                Hi, {userName}!
              </h2>
            </div>
          )}

          <div className="navbar-end mr-1">
            <button className="btn mr-1 bg-gradient-to-r from-sky-800 to-sky-600">
              <a
                href="https://elfin.vercel.app/"
                target="_blank"
                rel="noreferrer"
              >
                <InfoIcon />
              </a>
            </button>
            <Modal />
            {userImage !== null && userImage !== undefined && (
              <div className="dropdown-end dropdown">
                <label tabIndex={0} className="avatar btn btn-circle btn-ghost">
                  <div className="w-10 rounded-full">
                    <Image
                      src={userImage}
                      className="mask mask-squircle"
                      alt="avatar"
                      layout="fill"
                    />
                  </div>
                </label>
                <ul
                  tabIndex={0}
                  className="dropdown-content menu rounded-box menu-compact mt-3 w-52 p-2 shadow"
                >
                  <li className="bg-error bg-gradient-to-r from-red-800 to-red-600 text-white">
                    <a
                      className="btn btn-ghost font-mono text-xl tracking-widest subpixel-antialiased"
                      onClick={handleSignOut}
                    >
                      Logout
                    </a>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </>
      ) : (
        <div className="navbar-end">
          <button className="btn mr-1 bg-gradient-to-r from-sky-800 to-sky-600">
            <a
              href="https://elfin.vercel.app/"
              target="_blank"
              rel="noreferrer"
            >
              <InfoIcon />
            </a>
          </button>
          <div className="dropdown-end dropdown">
            <label tabIndex={0}>
              <button className="btn bg-gradient-to-r from-green-800 to-green-600 font-mono text-xl tracking-widest text-white subpixel-antialiased">
                Login
              </button>
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content menu rounded-box mt-3 w-52 p-2 shadow"
            >
              <li className="bg-gradient-to-r from-black to-indigo-900 font-mono text-xl font-semibold tracking-widest text-white subpixel-antialiased">
                <a onClick={handleGitHubSignIn}>GitHub</a>
              </li>
              <li className="bg-gradient-to-r from-red-900 to-red-700 font-mono text-xl font-semibold tracking-widest text-white subpixel-antialiased">
                <a onClick={handleRedditSignIn}>Reddit</a>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};