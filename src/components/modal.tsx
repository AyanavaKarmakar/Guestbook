import { TextIcon } from "../utils/icons";
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
          <div className="btn mr-3 bg-gradient-to-r from-indigo-900 via-purple-900 to-pink-900 font-mono text-lg tracking-wider text-white subpixel-antialiased">
            Add Message
          </div>
        </label>
      )}

      <input type="checkbox" id="add-message-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative">
          <label
            htmlFor="add-message-modal"
            className="btn btn-circle btn-sm absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 className="text-lg font-bold">
            Congratulations random Internet user!
          </h3>
          <p className="py-4">
            You've been selected for a chance to get one year of subscription to
            use Wikipedia for free!
          </p>
        </div>
      </div>
    </>
  );
};
