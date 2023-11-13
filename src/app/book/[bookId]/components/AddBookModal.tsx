"use client";

import { addBookToUser } from "@/actions/userBooks";
import { Modal } from "@/components/Modal";
import { RatingDropdown } from "@/components/RatingDropdown";
import { StatusDropdown } from "@/components/StatusDropdown";
import { CancelButton, SubmitButton } from "@/components/buttons";
import { BookData, ReadStatus } from "@/lib/types";
import { useState } from "react";

type AddBookModalProps = {
  bookData: BookData;
  close: () => void;
};

export const AddBookModal = ({ bookData, close }: AddBookModalProps) => {
  const [isPending, setIsPending] = useState(false);
  const [status, setStatus] = useState<ReadStatus>("completed");
  const [rating, setRating] = useState(10);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault()
    setIsPending(true);
    const userBook = await addBookToUser(bookData, status, rating);
    setIsPending(false);
    close()
    console.log('Book', userBook.bookId, 'added')
  };

  return (
    <Modal>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <h2>
          Add <span className="text-sky-500 font-medium">{bookData.title}</span>{" "}
          to your Library
        </h2>
        <StatusDropdown
          defaultValue={status}
          handleChange={(status: ReadStatus) => setStatus(status)}
        />
        {status === "completed" && (
          <RatingDropdown
            defaultValue={rating}
            handleChange={(rating) => setRating(rating)}
          />
        )}
        <div className="flex gap-2">
          <SubmitButton isPending={isPending}>Confirm</SubmitButton>
          <CancelButton onClick={close} />
        </div>
      </form>
    </Modal>
  );
};
