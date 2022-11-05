import { useSession } from "next-auth/react";
import { ChangeEvent, useState } from "react";
import { CancelIcon, TextIcon } from "../utils/icons";
import { useMobileDeviceStore } from "../utils/store";
import { trpc } from "../utils/trpc";

export const Modal = () => {
  const isMobileDevice = useMobileDeviceStore((state) => state.isMobileDevice);
  const [message, setMessage] = useState("");
  const { data: session } = useSession();
  const ctx = trpc.useContext();
  const postMessage = trpc.guestbook.postMessage.useMutation({
    /**
     * ? Configure optimistic UI update
     * @see https://trpc.io/docs/v10/useContext#helpers
     */
    onMutate: () => {
      ctx.guestbook.getAll.cancel();
      const optimisticUpdate = ctx.guestbook.getAll.getData();

      if (optimisticUpdate) {
        ctx.guestbook.getAll.setData(optimisticUpdate);
      }
    },

    /**
     * @see https://trpc.io/docs/v10/useContext#invalidating-a-single-query
     */
    onSettled: () => {
      ctx.guestbook.getAll.invalidate();
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
          name: session?.user.email.substring(
            0,
            session?.user.email.lastIndexOf("@")
          ) as string,
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
              : " mr-3 tracking-widest"
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
          <h3 className="mb-5 text-2xl font-bold tracking-wider text-white subpixel-antialiased">
            Add New Message
          </h3>
          <input
            type="text"
            placeholder="Type here"
            minLength={3}
            maxLength={100}
            className="input input-primary input-lg w-full max-w-xs"
            value={message}
            onChange={(event) => handleOnChange(event)}
          />
          <div
            onClick={handleSubmit}
            className="btn mt-5 ml-3 bg-gradient-to-r from-indigo-900 via-purple-900 to-pink-900 text-lg tracking-widest text-white subpixel-antialiased"
          >
            <span>Submit</span>
          </div>
        </div>
      </div>
    </>
  );
};
