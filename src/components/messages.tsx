import { motion } from "framer-motion";
import { trpc } from "../utils/trpc";
import { TypeAnimation } from "react-type-animation";
import { useMobileDeviceStore } from "../utils/store";

interface Props {
  status: "authenticated" | "unauthenticated";
  userName?: string | null;
  userEmail?: string | null;
}

export const Messages = (props: Props) => {
  const { status, userName, userEmail } = props;
  const { data: messages, isLoading } = trpc.guestbook.getAll.useQuery();
  const isMobileDevice = useMobileDeviceStore((state) => state.isMobileDevice);
  const utils = trpc.useContext();
  const deleteMessage = trpc.guestbook.deleteMessage.useMutation({
    /**
     * ? Configure optimistic UI update
     * @see https://trpc.io/docs/v10/useContext#helpers
     */
    onMutate: () => {
      utils.guestbook.getAll.cancel();
      const optimisticUpdate = utils.guestbook.getAll.getData();

      if (optimisticUpdate) {
        utils.guestbook.getAll.setData(optimisticUpdate);
      }
    },

    /**
     * @see https://trpc.io/docs/v10/useContext#invalidating-a-single-query
     */
    onSettled: () => {
      utils.guestbook.getAll.invalidate();
    },
  });

  if (isLoading === true) {
    return (
      <div className="mt-10 text-center font-mono text-xl font-semibold tracking-widest text-white subpixel-antialiased">
        <TypeAnimation
          sequence={[
            "Fetching Messages",
            62,
            "Fetching Messages.",
            125,
            "Fetching Messages..",
            250,
            "Fetching Messages...",
            500,
          ]}
          wrapper="div"
          cursor={false}
          repeat={Infinity}
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-evenly gap-5">
      <motion.div
        initial={{ scale: 0.0 }}
        animate={{ scale: 1.0 }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20,
        }}
      >
        <article
          className={`prose ${
            isMobileDevice === true ? "text-center" : "ml-5 mr-5"
          }`}
        >
          <h2 className="text-5xl font-extrabold uppercase text-white">
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
            <div className="card mt-5 ml-5 mr-5 w-auto bg-gradient-to-r from-indigo-900 to-cyan-900 text-white">
              <div className="card-body text-left tracking-widest subpixel-antialiased">
                <div className="flex flex-col gap-5">
                  <div>
                    <h2 className="card-title pb-1.5">{msg.message}</h2>
                    <p>— {msg.name}</p>
                  </div>
                  {status === "authenticated" &&
                    (userName === msg.name ||
                      userEmail?.substring(0, userEmail?.lastIndexOf("@")) ===
                        msg.name) && (
                      <div
                        className={`${
                          isMobileDevice === true
                            ? "flex items-center justify-center pt-3"
                            : null
                        }`}
                      >
                        <button
                          className="h-12 w-24 rounded-2xl bg-gradient-to-r from-red-800 via-rose-900 to-pink-900 hover:motion-safe:animate-pulse"
                          onClick={() => {
                            deleteMessage.mutate(msg.id);
                          }}
                        >
                          <span className="font-semibold uppercase tracking-wider text-white subpixel-antialiased">
                            Delete
                          </span>
                        </button>
                      </div>
                    )}
                </div>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};
