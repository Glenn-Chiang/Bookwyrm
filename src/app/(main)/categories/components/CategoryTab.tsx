"use client"

import Link from "next/link";
import { useParams } from "next/navigation";

export const CategoryTab = ({ category }: { category: string }) => {
  const currentCategory = useParams().categoryName
  const isActive = currentCategory === category

  return (
    <Link href={`/categories/${category}`} className={`p-2 w-max rounded-full ${isActive ? "bg-sky-100 text-sky-500" : "hover:bg-slate-100"}`}>
      {category}
    </Link>
  );
};
