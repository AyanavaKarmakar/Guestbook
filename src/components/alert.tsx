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
        <div className="alert flex items-center justify-center rounded bg-gradient-to-r from-red-700 to-zinc-800">
          <WarningIcon />
          <span
            className={`${
              isMobileDevice === true ? "text-md" : "text-xl"
            } font-bold tracking-widest text-white subpixel-antialiased`}
          >
            You need to login to post a message!
          </span>
        </div>
      )}
    </motion.div>
  );
};
