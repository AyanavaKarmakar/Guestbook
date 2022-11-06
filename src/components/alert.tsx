import { motion } from "framer-motion";
import { Session } from "next-auth";
import { WarningIcon } from "../utils/icons";
import { useMobileDeviceStore } from "../utils/store";

interface Props {
  session: Session | null;
}

export const Alert = (props: Props) => {
  const { session } = props;
  const isMobileDevice = useMobileDeviceStore((state) => state.isMobileDevice);

  return (
    <motion.div
      initial={{ scale: 0.5 }}
      animate={{ scale: 1.0 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
      }}
    >
      {!session && (
        <div className="m-3 flex items-center justify-center">
          <WarningIcon />
          <span
            className={`${
              isMobileDevice === true ? "text-md" : "text-xl"
            } pl-3 font-bold tracking-widest text-white subpixel-antialiased`}
          >
            You need to{" "}
            <span className="underline decoration-teal-600 decoration-solid decoration-4 underline-offset-2 hover:uppercase">
              login
            </span>{" "}
            to post a{" "}
            <span className="underline decoration-indigo-700 decoration-solid decoration-4 underline-offset-2 hover:uppercase">
              message
            </span>
            !
          </span>
        </div>
      )}
    </motion.div>
  );
};
