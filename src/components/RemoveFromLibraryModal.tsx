"use client";

import { removeBookFromUser } from "@/actions/userBooks";
import { Modal } from "@/components/Modal";
import { CancelButton, SubmitButton } from "@/components/buttons";
import { Book } from "@prisma/client";
import { useState } from "react";

type RemoveFromLibraryModalProps = {
  book: Book;
  close: () => void;
};

export const RemoveFromLibraryModal = ({
  book,
  close,
}: RemoveFromLibraryModalProps) => {
  const [isPending, setIsPending] = useState(false);

  const handleConfirm = async () => {
    setIsPending(true);
    await removeBookFromUser(book.id);
    close();
    setIsPending(false);
    console.log(`${book.title} removed from library`);
  };

  return (
    <Modal>
      <div className="flex flex-col gap-4">
        <h2>
          Remove <span className="text-sky-500 font-medium">{book.title}</span>{" "}
          from your library?
        </h2>
        <p className="text-slate-500">This book will be removed from all your shelves</p>
        <div className="flex gap-2">
          <SubmitButton isPending={isPending} onClick={handleConfirm}>
            Confirm
          </SubmitButton>
          <CancelButton onClick={close} />
        </div>
      </div>
    </Modal>
  );
};
