import { faBookOpenReader } from "@fortawesome/free-solid-svg-icons/faBookOpenReader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

export const Navbar = () => {
  return (
    <nav className="fixed h-16 left-0 top-0 w-screen flex items-center z-10 bg-sky-100 text-sky-500 shadow-sky-200 shadow font-medium p-2 text-xl">
      <Link href={"/"} className="flex gap-2 items-center">
        <FontAwesomeIcon icon={faBookOpenReader} />
        Bookwyrm
      </Link>
    </nav>
  );
};
