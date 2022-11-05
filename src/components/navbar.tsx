import { motion } from "framer-motion";
import { Session } from "next-auth";
import { signIn, signOut } from "next-auth/react";
import Image from "next/image";
import { InfoIcon } from "../utils/icons";
import { useMobileDeviceStore } from "../utils/store";
import { Modal } from "./modal";
import TextTransition, { presets } from "react-text-transition";
import { useState, useEffect } from "react";

interface Props {
  userName?: string | null;
  userImage?: string | null;
  userEmail?: string | null;
  session: Session | null;
  status: "authenticated" | "unauthenticated";
}

/**
 * ! Hotfix
 * TODO No idea how to optimize
 * ? Send HELP
 */
const TEXTS = [
  " Built By",
  " Built Using",
  " Built Using",
  " Built Using",
  " Built Using",
  " Built Using",
  " Built Using",
  " Built Using",
];
const SUB_TEXTS = [
  "Ayanava Karmakar",
  "the T3 Stack",
  "Next.js",
  "tRPC",
  "Tailwind CSS",
  "TypeScript",
  "Prisma",
  "NextAuth.js",
];
const DELAY_MS_FOR_TEXT = 3000;
const DELAY_MS_FOR_SUB_TEXT = 3000;

export const Navbar = (props: Props) => {
  const PLACEHOLDER_IMAGE =
    "https://ayanava-karmakar.imgix.net/https%3A%2F%2Fraw.githubusercontent.com%2FAyanavaKarmakar%2Fimgix-source-assets%2Fmain%2FsiteIcon.png?s=b56a16a7886aaf99f639de88c3fcdc0b";
  const { userName, userImage, userEmail, session, status } = props;
  const isMobileDevice = useMobileDeviceStore((state) => state.isMobileDevice);

  const [indexForText, setIndexForText] = useState(0);
  const [indexForSubText, setIndexForSubText] = useState(0);

  useEffect(() => {
    const intervalIdForText = setInterval(
      () => setIndexForText((indexForText) => indexForText + 1),
      DELAY_MS_FOR_TEXT
    );

    const intervalIdForSubText = setInterval(
      () => setIndexForSubText((indexForSubText) => indexForSubText + 1),
      DELAY_MS_FOR_SUB_TEXT
    );

    return () => {
      clearTimeout(intervalIdForText);
      clearTimeout(intervalIdForSubText);
    };
  }, []);

  function handleGitHubSignIn(): void {
    signIn("github");
  }

  function handleRedditSignIn(): void {
    signIn("reddit");
  }

  function handleEmailSignIn(): void {
    signIn("email");
  }

  function handleSignOut(): void {
    signOut();
  }

  return (
    <div className="navbar bg-gradient-to-r from-indigo-600 bg-auto">
      <div className="navbar-start">
        <motion.div
          initial={{ scale: 0.0 }}
          animate={{ scale: 1.0 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
          }}
        >
          <h1
            className={`ml-1 ${
              isMobileDevice === true ? "text-3xl" : "text-4xl"
            } font-extrabold uppercase tracking-normal text-cyan-100 subpixel-antialiased`}
          >
            <span className="bg-gradient-to-r from-violet-100 to-cyan-300 bg-clip-text text-transparent">
              GuestBook{" "}
            </span>
          </h1>
        </motion.div>
      </div>
      <div className="navbar-center">
        <h1
          className={
            "ml-1 text-4xl font-extrabold tracking-normal text-cyan-100 subpixel-antialiased"
          }
        >
          {isMobileDevice === false && status !== "authenticated" && (
            <>
              {" "}
              <TextTransition
                springConfig={presets.gentle}
                direction={"down"}
                inline
              >
                {TEXTS[indexForText % TEXTS.length]}
              </TextTransition>
              {"   "}
              <TextTransition
                springConfig={presets.wobbly}
                direction={"down"}
                inline
              >
                {SUB_TEXTS[indexForSubText % SUB_TEXTS.length]}
              </TextTransition>
            </>
          )}
        </h1>
      </div>
      {session ? (
        <>
          {isMobileDevice !== true &&
            userEmail !== null &&
            userEmail !== undefined && (
              <div className="navbar-center">
                <h2 className="text-xl font-semibold tracking-wider text-white subpixel-antialiased">
                  Hi,{" "}
                  {userName !== null
                    ? userName
                    : userEmail.substring(0, userEmail.lastIndexOf("@"))}
                  !
                </h2>
              </div>
            )}

          <div className="navbar-end mr-1">
            <button className="btn mr-1 bg-gradient-to-r from-sky-800 to-sky-600 hover:motion-safe:animate-pulse">
              <a
                href="https://linktree.ayanavakarmakar.software"
                target="_blank"
                rel="noreferrer"
              >
                <motion.div
                  initial={{ scale: 0.0 }}
                  animate={{ scale: 1.0 }}
                  transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 20,
                  }}
                >
                  <InfoIcon />
                </motion.div>
              </a>
            </button>
            <motion.div
              initial={{ scale: 0.0 }}
              animate={{ scale: 1.0 }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 20,
              }}
            >
              <Modal />
            </motion.div>
            <div className="dropdown-end dropdown">
              <label tabIndex={0} className="avatar btn btn-ghost btn-circle">
                <div className="w-10 rounded-full">
                  <Image
                    src={`${
                      userImage !== null && userImage !== undefined
                        ? userImage
                        : PLACEHOLDER_IMAGE
                    }`}
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
                    className="btn btn-ghost text-xl tracking-wider subpixel-antialiased"
                    onClick={handleSignOut}
                  >
                    Logout
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </>
      ) : (
        <div className="navbar-end">
          <button className="btn mr-1 bg-gradient-to-r from-sky-800 to-sky-600 hover:motion-safe:animate-pulse">
            <a
              href="https://linktree.ayanavakarmakar.software"
              target="_blank"
              rel="noreferrer"
            >
              <motion.div
                initial={{ scale: 0.0 }}
                animate={{ scale: 1.0 }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                }}
              >
                <InfoIcon />
              </motion.div>
            </a>
          </button>
          <div className="dropdown-end dropdown">
            <motion.div
              initial={{ scale: 0.0 }}
              animate={{ scale: 1.0 }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 20,
              }}
            >
              <label tabIndex={0}>
                <button className="btn bg-gradient-to-r from-green-800 to-green-600 text-xl tracking-wider text-white subpixel-antialiased hover:motion-safe:animate-pulse">
                  Login
                </button>
              </label>
            </motion.div>
            <ul
              tabIndex={0}
              className="dropdown-content menu rounded-box mt-3 w-52 p-2 shadow"
            >
              <li className="bg-gradient-to-r from-black to-indigo-900 text-xl font-semibold tracking-wider text-white subpixel-antialiased hover:motion-safe:animate-pulse">
                <a onClick={handleGitHubSignIn}>GitHub</a>
              </li>
              <li className="bg-gradient-to-r from-red-900 to-red-700 text-xl font-semibold tracking-wider text-white subpixel-antialiased hover:motion-safe:animate-pulse">
                <a onClick={handleRedditSignIn}>Reddit</a>
              </li>
              <li className="bg-gradient-to-r from-green-900 to-cyan-700 text-xl font-semibold tracking-wider text-white subpixel-antialiased hover:motion-safe:animate-pulse">
                <a onClick={handleEmailSignIn}>Email</a>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};
