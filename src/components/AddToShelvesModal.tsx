'use client'

import { Book, Shelf } from "@prisma/client";
import { Modal } from "./Modal";
import { BookData } from "@/lib/types";
import { CancelButton, SubmitButton } from "./buttons";
import { useState } from 'react';

type AddBookToShelvesModalProps = {
  book: BookData;
  close: () => void;
  shelves: Shelf[]
};

export const AddToShelvesModal = ({
  book,
  shelves,
  close,
}: AddBookToShelvesModalProps) => {
  const [isPending, setIsPending] = useState(false)



  return (
    <Modal>
      <form className="flex flex-col gap-4">
        <h2>
          Your shelves for <span className="text-sky-500 font-medium">{book.title}</span>
        </h2>
        <div className="flex gap-2">
          <SubmitButton isPending={isPending}>Confirm</SubmitButton>
          <CancelButton onClick={close}/>
        </div>
      </form>
    </Modal>
  );
};
