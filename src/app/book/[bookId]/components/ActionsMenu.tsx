"use client";

import { updateBookRating, updateBookStatus } from "@/actions/userBooks";
import { RatingDropdown } from "@/components/RatingDropdown";
import { StatusDropdown } from "@/components/StatusDropdown";
import { BookData, ReadStatus, UserBookDetail } from "@/lib/types";
import { Shelf, UserBook } from "@prisma/client";
import { ShelvesButton } from "./ShelvesButton";
import { AddBookButton } from "./AddBookButton";
import { RemoveBookButton } from "./RemoveBookButton";
import { useState } from "react";
import { AddToShelvesModal } from "@/components/AddToShelvesModal";

type ActionsMenuProps = {
  bookData: BookData;
  userBook: UserBookDetail | null;
  shelves: Shelf[];
};

export const ActionsMenu = ({
  userBook,
  bookData,
  shelves,
}: ActionsMenuProps) => {
  const handleStatusChange = async (status: ReadStatus) => {
    await updateBookStatus(bookData.id, status);
  };

  const handleRatingChange = async (rating: number | null) => {
    await updateBookRating(bookData.id, rating);
  };

  const [shelvesModalIsOpen, setShelvesModalIsOpen] = useState(false);

  return (
    <section className="flex flex-col gap-4">
      {!userBook && <AddBookButton bookData={bookData} />}
      {userBook && (
        <StatusDropdown
          defaultValue={userBook.status as ReadStatus}
          handleChange={handleStatusChange}
        />
      )}
      {userBook && userBook.status === "completed" && (
        <RatingDropdown
          defaultValue={userBook.rating}
          handleChange={handleRatingChange}
        />
      )}
      {userBook && (
        <>
          <ShelvesButton onClick={() => setShelvesModalIsOpen(true)} />
          {shelvesModalIsOpen && (
            <AddToShelvesModal
              userBook={userBook}
              book={bookData}
              shelves={shelves}
              close={() => setShelvesModalIsOpen(false)}
            />
          )}
          {/* <span className="text-slate-500">Added on {userBook.dateAdded.toLocaleDateString()}</span>
            <span className="text-slate-500">Last updated {userBook.updatedAt.toLocaleDateString()}</span> */}
          <RemoveBookButton bookId={bookData.id} />
        </>
      )}
    </section>
  );
};
