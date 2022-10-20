import { useSession } from "next-auth/react";
import { trpc } from "../utils/trpc";

export const Footer = () => {
  const { status } = useSession();
  const { isLoading } = trpc.guestbook.getAll.useQuery();

  if (status === "loading" || isLoading === true) {
    return null;
  }

  return (
    <footer className="footer footer-center mt-20 bg-base-300 p-4 text-base-content">
      <div>
        <p>Copyright © 2022 - All right reserved by ACME Industries Ltd</p>
      </div>
    </footer>
  );
};
