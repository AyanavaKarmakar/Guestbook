import { motion } from "framer-motion";
import { Session } from "next-auth";
import { signIn, signOut } from "next-auth/react";
import Image from "next/image";
import { InfoIcon } from "../utils/icons";
import { useMobileDeviceStore } from "../utils/store";
import { Modal } from "./modal";
import TextTransition, { presets } from "react-text-transition";
import { useState, useEffect } from "react";
import { getUserNameFromEmail } from "../utils/getUserName";

interface Props {
  userName?: string | null;
  userImage?: string | null;
  userEmail?: string | null;
  session: Session | null;
  status: "authenticated" | "unauthenticated";
}

const SUB_TEXTS = ["by Ayanava Karmakar", "using the T3 Stack"];
const DELAY_MS_FOR_SUB_TEXT = 3500;

export const Navbar = (props: Props) => {
  const PLACEHOLDER_IMAGE =
    "https://ayanava-karmakar.imgix.net/https%3A%2F%2Fraw.githubusercontent.com%2FAyanavaKarmakar%2Fimgix-source-assets%2Fmain%2FsiteIcon.png?s=b56a16a7886aaf99f639de88c3fcdc0b";
  const { userName, userImage, userEmail, session, status } = props;
  const isMobileDevice = useMobileDeviceStore((state) => state.isMobileDevice);

  const [indexForSubText, setIndexForSubText] = useState(0);

  useEffect(() => {
    const intervalIdForSubText = setInterval(
      () => setIndexForSubText((indexForSubText) => indexForSubText + 1),
      DELAY_MS_FOR_SUB_TEXT
    );

    return () => {
      clearInterval(intervalIdForSubText);
    };
  }, []);

  function handleSignOut() {
    signOut();
  }

  return (
    <div className="p-auto navbar bg-gradient-to-r from-indigo-600 bg-auto">
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
            className={`${
              isMobileDevice === true ? "text-4xl" : "text-5xl"
            } mb-1.5 mr-1 pt-1 pb-1 pr-1 font-extrabold uppercase tracking-normal subpixel-antialiased`}
          >
            <span className="bg-gradient-to-r from-violet-200 via-cyan-200 to-emerald-200 bg-clip-text text-transparent">
              GuestBook
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
              Made with 💕{" "}
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
                    : getUserNameFromEmail(userEmail)}
                  !
                </h2>
              </div>
            )}

          <div className="navbar-end mr-1">
            <a
              href="https://linktree.ayanavakarmakar.software"
              target="_blank"
              rel="noreferrer"
            >
              <button className="btn mr-1 bg-gradient-to-r from-indigo-800 to-sky-800 hover:motion-safe:animate-pulse">
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
              </button>
            </a>
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
            <div className="dropdown dropdown-end">
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
          <a
            href="https://linktree.ayanavakarmakar.software"
            target="_blank"
            rel="noreferrer"
          >
            <button className="btn mr-1 bg-gradient-to-r from-indigo-800 to-sky-800 hover:motion-safe:animate-pulse">
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
            </button>
          </a>
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
                <a
                  // href={"/api/auth/signin"}
                  onClick={(e) => {
                    e.preventDefault();
                    signIn();
                  }}
                  className="btn bg-gradient-to-r from-lime-900 to-emerald-700 text-xl tracking-wider text-white subpixel-antialiased hover:motion-safe:animate-pulse"
                >
                  Login
                </a>
              </label>
            </motion.div>
          </div>
        </div>
      )}
    </div>
  );
};
