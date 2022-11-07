import { useSession } from "next-auth/react";
import { ChangeEvent, useState } from "react";
import { getUserNameFromEmail } from "../utils/getUserName";
import { CancelIcon, TextIcon } from "../utils/icons";
import { useMobileDeviceStore } from "../utils/store";
import { trpc } from "../utils/trpc";

export const Modal = () => {
  const isMobileDevice = useMobileDeviceStore((state) => state.isMobileDevice);
  const [message, setMessage] = useState("");
  const { data: session } = useSession();
  const utils = trpc.useContext();
  const postMessage = trpc.guestbook.postMessage.useMutation({
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

  function handleOnChange(event: ChangeEvent<HTMLInputElement>): void {
    setMessage(event.target.value);
  }

  function handleSubmit() {
    if (
      session?.user !== undefined &&
      message !== undefined &&
      message !== null &&
      message.length >= 1
    ) {
      if (session?.user.name !== null) {
        postMessage.mutate({
          name: session?.user.name as string,
          message,
        });
      } else if (
        session?.user.name === null &&
        session.user.email !== null &&
        session.user.email !== undefined
      ) {
        postMessage.mutate({
          name: getUserNameFromEmail(session?.user.email),
          message,
        });
      }
    }

    setMessage("");
  }

  return (
    <>
      <label htmlFor="add-message-modal" className="modal-button">
        <div
          className={`btn ${
            isMobileDevice === true
              ? "mr-2 tracking-wider"
              : "mr-3 tracking-widest"
          } bg-gradient-to-r from-indigo-900 via-purple-900 to-pink-900 text-lg text-white subpixel-antialiased`}
        >
          {isMobileDevice === true ? <TextIcon /> : "Add Message"}
        </div>
      </label>

      <input type="checkbox" id="add-message-modal" className="modal-toggle" />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box relative">
          <label
            htmlFor="add-message-modal"
            className="btn btn-circle btn-sm absolute right-2 top-2"
          >
            <CancelIcon />
          </label>
          <h3 className="pb-8 text-center text-2xl font-bold tracking-wider text-white subpixel-antialiased">
            Add New Message
          </h3>
          <div className="grid grid-cols-1 items-center justify-center">
            <input
              type="text"
              placeholder="Start typing..."
              minLength={3}
              maxLength={100}
              className="input input-primary"
              value={message}
              onChange={(event) => handleOnChange(event)}
            />
            <div
              onClick={handleSubmit}
              className="btn mt-5 bg-gradient-to-r from-indigo-900 via-purple-900 to-pink-900 text-lg tracking-widest text-white subpixel-antialiased"
            >
              <span>Submit</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
