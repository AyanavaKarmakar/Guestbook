import { Session } from "next-auth";
import { WarningIcon } from "../utils/icons";

interface Props {
  session: Session | null;
}

export const Alert = (props: Props) => {
  const { session } = props;

  return (
    <>
      {!session && (
        <div className="alert rounded-3xl bg-gradient-to-r from-red-900 to-yellow-900">
          <div>
            <WarningIcon />
            <span className="ml-5 font-mono text-lg tracking-wider text-white subpixel-antialiased">
              You need to login to post a message!
            </span>
          </div>
        </div>
      )}
    </>
  );
};
