"use client"

import Link from "next/link";
import { useParams } from "next/navigation";

export const CategoryTab = ({ category }: { category: string }) => {
  const currentCategory = useParams().categoryName
  const isActive = currentCategory === category

  return (
    <Link href={category} className={`p-2 rounded-full ${isActive && "bg-sky-100 text-sky-500"}`}>
      {category}
    </Link>
  );
};
