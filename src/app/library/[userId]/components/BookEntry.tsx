"use client";

import { updateBookRating, updateBookStatus } from "@/actions/userBooks";
import { AddToShelvesModal } from "@/components/AddToShelvesModal";
import { RatingDropdown } from "@/components/RatingDropdown";
import { RemoveBookModal } from "@/components/RemoveBookModal";
import { StatusDropdown } from "@/components/StatusDropdown";
import { ActionButton } from "@/components/buttons";
import { ReadStatus, UserBookDetail } from "@/lib/types";
import { Shelf } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

type BookEntryProps = {
  userBook: UserBookDetail;
  shelves: Shelf[]
};

export const BookEntry = ({ userBook, shelves }: BookEntryProps) => {
  const { id: bookId, thumbnail, title, authors } = userBook.book;

  const handleStatusChange = async (status: ReadStatus) => {
    await updateBookStatus(bookId, status);
  };

  const handleRatingChange = async (rating: number | null) => {
    await updateBookRating(bookId, rating);
  };

  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const [removeModalIsOpen, setRemoveModalIsOpen] = useState(false);
  const [shelvesModalIsOpen, setShelvesModalIsOpen] = useState(false);

  return (
    <article key={userBook.bookId} className="flex gap-4 p-4 ">
      {thumbnail && (
        <Link href={`/book/${bookId}`} className="w-1/3">
          <Image
            src={thumbnail}
            alt=""
            width={100} // this is arbitrary. we are using css to set the size
            height={100} // this is arbitrary. we are using css to set the size
            className="rounded w-full h-auto"
          />
        </Link>
      )}
      <div className="flex flex-col gap-4 relative w-2/3">
        <div className="flex flex-col gap-2">
          <Link href={`/book/${bookId}`} className="hover:text-sky-500">
            <h2>{title}</h2>
          </Link>
          <div>{authors.join(", ")}</div>
        </div>
        <div className="flex flex-col gap-2">
          <StatusDropdown
            defaultValue={userBook.status as ReadStatus}
            handleChange={handleStatusChange}
          />
          {userBook.status === "completed" && (
            <RatingDropdown
              defaultValue={userBook.rating}
              handleChange={handleRatingChange}
            />
          )}
        </div>
        <ActionButton onClick={() => setMenuIsOpen((prev) => !prev)} />
        {menuIsOpen && (
          <ActionMenu
            handleClickShelves={() => setShelvesModalIsOpen(true)}
            handleClickRemove={() => setRemoveModalIsOpen(true)}
          />
        )}
        {shelvesModalIsOpen && (
          <AddToShelvesModal userBook={userBook} shelves={shelves} close={() => setShelvesModalIsOpen(false)}/>
        )}
        {removeModalIsOpen && (
          <RemoveBookModal
            bookId={bookId}
            close={() => setRemoveModalIsOpen(false)}
          />
        )}
      </div>
    </article>
  );
};

type ActionMenuProps = {
  handleClickShelves: () => void;
  handleClickRemove: () => void;
};
// TODO: Close menu when user clicks away from it
const ActionMenu = ({
  handleClickShelves,
  handleClickRemove,
}: ActionMenuProps) => {
  return (
    <menu className="z-10 shadow bg-slate-100 absolute bottom-0 right-12 rounded">
      <li
        onClick={handleClickShelves}
        className="rounded-t p-2 w-max text-slate-500 hover:bg-slate-200 hover:text-slate-600"
      >
        Manage shelves
      </li>
      <li
        onClick={handleClickRemove}
        className="rounded-b p-2 w-max text-slate-500 hover:bg-slate-200 hover:text-slate-600"
      >
        Remove from library
      </li>
    </menu>
  );
};
