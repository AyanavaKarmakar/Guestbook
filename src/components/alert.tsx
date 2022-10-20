const WarningSign = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6 flex-shrink-0 stroke-white"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
      />
    </svg>
  );
};

export const Alert = () => {
  return (
    <div className="alert rounded-3xl bg-gradient-to-r from-red-900 to-yellow-900">
      <div>
        <WarningSign />
        <span className="ml-5 font-mono text-lg tracking-wider text-white subpixel-antialiased">
          You need to login to post a message!
        </span>
      </div>
    </div>
  );
};
