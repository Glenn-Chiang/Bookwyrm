"use client";

import { useState } from "react";
import { RemoveBookModal } from "../../../../components/RemoveBookModal";

type RemoveBookButtonProps = {
  bookId: string;
};

export const RemoveBookButton = ({ bookId }: RemoveBookButtonProps) => {
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
        <RemoveBookModal bookId={bookId} close={() => setModalIsOpen(false)} />
      )}
    </>
  );
};
