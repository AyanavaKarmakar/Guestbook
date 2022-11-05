export const Footer = () => {
  return (
    <div className="m-3 flex items-center justify-center">
      <p className="text-lg tracking-wide text-white">
        © {new Date().getFullYear()}{" "}
        <span className="underline decoration-red-200 decoration-dotted underline-offset-2">
          Ayanava
        </span>{" "}
        <span className="underline decoration-sky-200 decoration-dotted underline-offset-2">
          Karmakar
        </span>
      </p>
    </div>
  );
};
