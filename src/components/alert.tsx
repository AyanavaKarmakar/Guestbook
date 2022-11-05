import { motion } from "framer-motion";
import { Session } from "next-auth";
import { WarningIcon } from "../utils/icons";

interface Props {
  session: Session | null;
}

export const Alert = (props: Props) => {
  const { session } = props;

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
        <div className="alert rounded bg-gradient-to-r from-red-900 to-yellow-900">
          <div>
            <WarningIcon />
            <span className="ml-5 text-lg font-semibold tracking-wider text-white subpixel-antialiased">
              You need to login to post a message!
            </span>
          </div>
        </div>
      )}
    </motion.div>
  );
};
