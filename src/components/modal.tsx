import { CancelIcon, TextIcon } from "../utils/icons";
import { useMobileDeviceStore } from "../utils/store";

export const Modal = () => {
  const isMobileDevice = useMobileDeviceStore((state) => state.isMobileDevice);

  return (
    <>
      {isMobileDevice === true ? (
        <label htmlFor="add-message-modal" className="modal-button">
          <div className="btn mr-2 bg-gradient-to-r from-indigo-900 via-purple-900 to-pink-900 font-mono text-lg tracking-wider text-white subpixel-antialiased">
            <TextIcon />
          </div>
        </label>
      ) : (
        <label htmlFor="add-message-modal" className="modal-button">
          <div className="btn mr-3 bg-gradient-to-r from-indigo-900 via-purple-900 to-pink-900 font-mono text-lg tracking-widest text-white subpixel-antialiased">
            Add Message
          </div>
        </label>
      )}

      <input type="checkbox" id="add-message-modal" className="modal-toggle" />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box relative">
          <label
            htmlFor="add-message-modal"
            className="btn btn-circle btn-sm absolute right-2 top-2"
          >
            <CancelIcon />
          </label>
          <h3 className="mb-5 font-mono text-2xl font-bold tracking-wider text-white subpixel-antialiased">
            Add New Message
          </h3>
          <input
            type="text"
            placeholder="Type here"
            className="input input-primary input-lg w-full max-w-xs"
          />
          <div className="btn mt-5 ml-3 bg-gradient-to-r from-indigo-900 via-purple-900 to-pink-900 font-mono text-lg tracking-widest text-white subpixel-antialiased">
            <span>Submit</span>
          </div>
        </div>
      </div>
    </>
  );
};
