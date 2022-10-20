import { trpc } from "../utils/trpc";

export const Messages = () => {
  const { data: messages, isLoading } = trpc.guestbook.getAll.useQuery();

  if (isLoading === true) {
    return (
      <div className="font-mono text-xl font-semibold tracking-wider text-white subpixel-antialiased">
        Fetching Messages...
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <h2>
        <u>Messages</u>
      </h2>
      {messages?.map((msg, index) => {
        return (
          <div key={index}>
            <p>{msg.message}</p>
            <span>- {msg.name}</span>
          </div>
        );
      })}
    </div>
  );
};
