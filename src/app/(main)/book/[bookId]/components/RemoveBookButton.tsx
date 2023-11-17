"use client";

import { useState } from "react";
import { Book } from "@prisma/client";
import { RemoveFromLibraryModal } from "@/components/RemoveFromLibraryModal";

type RemoveBookButtonProps = {
  book: Book;
};

export const RemoveBookButton = ({ book }: RemoveBookButtonProps) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setModalIsOpen(true)}
        className="bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-600"
      >
        Remove from Library
      </button>
      {modalIsOpen && (
        <RemoveFromLibraryModal
        book={book}
        close={() => setModalIsOpen(false)}
        />
      )}
    </>
  );
};
