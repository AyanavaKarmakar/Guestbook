import { motion } from "framer-motion";
import { trpc } from "../utils/trpc";
import { TypeAnimation } from "react-type-animation";

export const Messages = () => {
  const { data: messages, isLoading } = trpc.guestbook.getAll.useQuery();

  if (isLoading === true) {
    return (
      <div className="mt-10 text-center font-mono text-xl font-semibold tracking-wider text-white subpixel-antialiased">
        Fetching Messages
        <TypeAnimation
          sequence={[".", 125, "..", 250, "...", 500]}
          wrapper="div"
          cursor={false}
          repeat={Infinity}
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5">
      <motion.div
        initial={{ scale: 0.0 }}
        animate={{ scale: 1.0 }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20,
        }}
      >
        <article className="prose">
          <h2 className="text-center text-5xl font-extrabold uppercase text-white">
            <span className="bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">
              Guest Logs
            </span>
          </h2>
        </article>
      </motion.div>
      {messages?.map((msg, index) => {
        return (
          <motion.div
            key={index}
            initial={{ scale: 0.0 }}
            animate={{ scale: 1.0 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
            }}
          >
            <div className="card mt-5 w-96 bg-gradient-to-r from-indigo-900 to-cyan-900 text-white">
              <div className="card-body text-left font-mono tracking-wider subpixel-antialiased">
                <h2 className="card-title">{msg.message}</h2>
                <p>— {msg.name}</p>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};
