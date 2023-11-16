"use client";

import { updateBookRating, updateBookStatus } from "@/actions/userBooks";
import { AddToShelvesModal } from "@/components/AddToShelvesModal";
import { RatingDropdown } from "@/components/RatingDropdown";
import { RemoveFromLibraryModal } from "@/components/RemoveFromLibraryModal";
import { StatusDropdown } from "@/components/StatusDropdown";
import { ActionButton } from "@/components/buttons";
import { ReadStatus, UserBookDetail } from "@/lib/types";
import { Shelf } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import { RemoveFromShelfModal } from "./RemoveFromShelfModal";
import { parseParamFromUrl } from '../lib/helpers/serializeUrlParam';

type BookEntryProps = {
  userBook: UserBookDetail;
  shelves: Shelf[];
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
  const [shelvesModalIsOpen, setShelvesModalIsOpen] = useState(false);
  const [removeFromShelfModalIsOpen, setRemoveFromShelfModalIsOpen] =
    useState(false);
  const [removeFromLibraryModalIsOpen, setRemoveFromLibraryModalIsOpen] =
    useState(false);

  // Determine whether this component is rendered in a shelf or in 'All Books' page
  const shelfname = parseParamFromUrl(useParams().shelfname);

  return (
    <article
      key={userBook.bookId}
      className="flex gap-4 p-4 sm:h-[50vh] lg:h-[40vh] shadow"
    >
      {thumbnail && (
        <Link href={`/book/${bookId}`} className="w-1/3 h-full">
          <Image
            src={thumbnail}
            alt=""
            width={100} // this is arbitrary. we are using css to set the size
            height={100} // this is arbitrary. we are using css to set the size
            className="rounded w-full max-h-full"
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
        <div className="absolute bottom-1 sm:bottom-4 right-0 sm:right-4 ">
          <ActionButton onClick={() => setMenuIsOpen((prev) => !prev)} />
        </div>
        {menuIsOpen && (
          <ActionMenu
            manageShelves={() => setShelvesModalIsOpen(true)}
            removeFromShelf={() => setRemoveFromShelfModalIsOpen(true)}
            removeFromLibrary={() => setRemoveFromLibraryModalIsOpen(true)}
          />
        )}
        {shelvesModalIsOpen && (
          <AddToShelvesModal
            userBook={userBook}
            shelves={shelves}
            close={() => setShelvesModalIsOpen(false)}
          />
        )}
        {removeFromShelfModalIsOpen && shelfname && (
          <RemoveFromShelfModal
            shelfname={shelfname as string}
            book={userBook.book}
            close={() => setRemoveFromShelfModalIsOpen(false)}
          />
        )}
        {removeFromLibraryModalIsOpen && (
          <RemoveFromLibraryModal
            book={userBook.book}
            close={() => setRemoveFromLibraryModalIsOpen(false)}
          />
        )}
      </div>
    </article>
  );
};

type ActionMenuProps = {
  manageShelves: () => void;
  removeFromLibrary: () => void;
  removeFromShelf: () => void;
};
// TODO: Close menu when user clicks away from it
const ActionMenu = ({
  manageShelves,
  removeFromLibrary,
  removeFromShelf,
}: ActionMenuProps) => {
  // Determine whether this component is rendered in a shelf or in 'All Books' page
  // Only show RemoveFromShelf button if user is on a ShelfPage. If user is in 'All Books' page, RemoveFromShelf button is not shown.
  const params = useParams();
  const onShelfPage = !!params.shelfname;

  return (
    <menu className="z-10 absolute bottom-0 right-12 rounded bg-slate-100 shadow flex flex-col">
      <button
        onClick={manageShelves}
        className=" rounded-t rounded-b-none p-2 text-slate-500 hover:bg-slate-200 hover:text-slate-600 shadow-none"
      >
        Manage shelves
      </button>
      {onShelfPage && (
        <button
          onClick={removeFromShelf}
          className="rounded-none p-2 text-slate-500 hover:bg-slate-200 hover:text-slate-600 shadow-none"
        >
          Remove from shelf
        </button>
      )}
      <button
        onClick={removeFromLibrary}
        className=" rounded-b rounded-t-none p-2 text-slate-500 hover:bg-slate-200 hover:text-slate-600 shadow-none"
      >
        Remove from library
      </button>
    </menu>
  );
};
