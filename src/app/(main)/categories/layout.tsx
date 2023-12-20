import {
  faBookOpen
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React from "react";
import { CategoryTab } from "./components/CategoryTab";

export default function CategoriesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const categories = ["classics", "fantasy", "mystery", "philosophy", "history", "science"];

  return (
    <main>
      <h1 className="fixed top-16 h-16 bg-white z-10 w-screen flex justify-center items-center gap-2 shadow left-0">
        <FontAwesomeIcon icon={faBookOpen} />
        Browse books
      </h1>
      <nav className="shadow overflow-x-scroll sm:overflow-x-hidden sm:justify-center fixed left-0 px-4 top-28 h-16 w-full z-10 bg-white flex items-center gap-4 capitalize">
        {categories.map((category) => (
          <CategoryTab key={category} category={category} />
        ))}
      </nav>
      <section className="mt-28">{children}</section>
    </main>
  );
}

