"use client";

import { Book } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

type BookItemProps = {
  book: Book;
};

export const BookItem = ({ book }: BookItemProps) => {
  const { id: bookId, thumbnail, title, authors } = book;
  return (
    <li className="flex flex-col justify-between items-center gap-4">
      {thumbnail && (
        <Image
          src={thumbnail}
          alt=""
          width={100} // this is arbitrary. we are using css to set the size
          height={100} // this is arbitrary. we are using css to set the size
          className="rounded w-full max-h-full"
        />
      )}
      <span className="text-center">{book.title}</span>
    </li>
  );
};
