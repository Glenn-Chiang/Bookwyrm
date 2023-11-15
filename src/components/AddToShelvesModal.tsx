"use client";

import { UserBookDetail } from "@/lib/types";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Shelf } from "@prisma/client";
import { useState } from "react";
import { Modal } from "./Modal";
import { CancelButton, SubmitButton } from "./buttons";
import { setBookShelves } from "@/actions/shelfBooks";

type AddBookToShelvesModalProps = {
  userBook: UserBookDetail;
  close: () => void;
  shelves: Shelf[];
};

export const AddToShelvesModal = ({
  userBook,
  shelves,
  close,
}: AddBookToShelvesModalProps) => {

  const [selectedShelves, setSelectedShelves] = useState(
    userBook.shelves.map((shelfBook) => shelfBook.shelfname)
  );

  const selectShelf = (shelf: string) => {
    const alreadyInShelf = !!selectedShelves.find(
      (selectedShelf) => selectedShelf === shelf
    );
    if (alreadyInShelf) {
      setSelectedShelves(
        selectedShelves.filter((selectedShelf) => selectedShelf !== shelf)
      );
    } else {
      setSelectedShelves([...selectedShelves, shelf]);
    }
  };

  const [isPending, setIsPending] = useState(false);

  const handleSubmit = async () => {
    setIsPending(true)
    await setBookShelves(userBook.bookId, selectedShelves)
    close()
    console.log('Updated shelves for book:', userBook.bookId)
  }

  return (
    <Modal>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 h-full max-h-[50vh] sm:max-h-[60vh]"> 
        <h2>
          Your shelves for{" "}
          <span className="text-sky-500 font-medium">{userBook.book.title}</span>
        </h2>
        <p className="text-slate-500 ">
          Added to {selectedShelves.length} shelves
        </p>
        <ul className="flex flex-col gap-2 overflow-y-auto">
          {shelves.map((shelf) => (
            <ShelfItem
              key={shelf.shelfname}
              shelf={shelf}
              selectedShelves={selectedShelves}
              handleClick={() => selectShelf(shelf.shelfname)}
            />
          ))}
        </ul>
        <div className="flex gap-2">
          <SubmitButton isPending={isPending}>Confirm</SubmitButton>
          <CancelButton onClick={close} />
        </div>
      </form>
    </Modal>
  );
};

type ShelfItemProps = {
  shelf: Shelf;
  selectedShelves: string[];
  handleClick: () => void;
};

const ShelfItem = ({ shelf, selectedShelves, handleClick }: ShelfItemProps) => {
  // Check if book is already in this shelf
  const inShelf = !!selectedShelves.find(
    (selectedShelf) => selectedShelf === shelf.shelfname
  );

  return (
    <li
      onClick={handleClick}
      className={`flex gap-2 items-center transition p-2 rounded-md ${
        inShelf ? "bg-sky-100 text-sky-500 " : "hover:bg-slate-200 bg-slate-100"
      }`}
    >
      {inShelf && <FontAwesomeIcon icon={faCheckCircle} />}
      {shelf.shelfname}
    </li>
  );
};
