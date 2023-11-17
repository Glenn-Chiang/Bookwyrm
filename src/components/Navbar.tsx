'use client'

import Link from "next/link";
import { Logo } from "./Logo";
import { useCurrentUser } from "@/lib/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookOpenReader } from "@fortawesome/free-solid-svg-icons";

export const Navbar = () => {
  const currentUser = useCurrentUser()
  return (
    <nav className="fixed h-16 left-0 top-0 w-screen flex items-center justify-between sm:justify-start gap-8 z-20 bg-sky-100 text-sky-500 px-2 font-medium">
      <Link href={"/"} className="flex gap-2 items-center text-xl ">
        <Logo size="medium"/>
        Bookwyrm
      </Link>
      <Link href={`/library/${currentUser.id}`} className="flex gap-2 items-center">
        <FontAwesomeIcon icon={faBookOpenReader}/>
        Your Library
      </Link>
    </nav>
  );
};
