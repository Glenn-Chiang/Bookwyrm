import Link from "next/link";
import { Logo } from "./Logo";
import { getCurrentUser, useCurrentUser } from "@/lib/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookOpenReader, faSearch, faUsers } from "@fortawesome/free-solid-svg-icons";

export const Navbar = async () => {
  const currentUser = await getCurrentUser()
  return (
    <nav className="fixed h-16 left-0 top-0 w-screen flex items-center justify-start gap-8 z-20 px-2 bg-sky-500 text-white">
      <Link href={"/categories"} className="flex gap-2 items-center text-xl ">
        <Logo size="medium" />
        Bookwyrm
      </Link>
      <div className="flex gap-4 items-center">
        <Link
          href={"/search"}
          className="flex sm:gap-2 items-center flex-col sm:flex-row"
        >
          <FontAwesomeIcon icon={faSearch}/>
          Search
        </Link>
        <Link
          href={`/library/${currentUser?.id}`}
          className="flex sm:gap-2 items-center flex-col sm:flex-row"
        >
          <FontAwesomeIcon icon={faBookOpenReader} />
          Library
        </Link>
        <Link
          href={"/community"}
          className="flex sm:gap-2 items-center flex-col sm:flex-row"
        >
          <FontAwesomeIcon icon={faUsers} />
          Community
        </Link>
      </div>
    </nav>
  );
};
