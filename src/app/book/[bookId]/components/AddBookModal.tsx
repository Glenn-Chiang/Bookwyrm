"use client"

import { Modal } from "@/components/Modal";
import { CancelButton, SubmitButton } from "@/components/buttons";
import { VolumeInfo } from "@/lib/books-api/types";
import { useState } from "react";

type AddBookModalProps = {
  bookData: VolumeInfo;
  close: () => void
};

export const AddBookModal = ({ bookData, close }: AddBookModalProps) => {
  const [isPending, setIsPending] = useState(false)

  const handleSubmit = () => {
    setIsPending(true)
    // do stuff
    setIsPending(false)
  }

  return (
    <Modal>
      <h2>
        Add <span className="text-sky-500 font-medium">{bookData.title}</span> to your
        Library
      </h2>
      <div className="flex pt-4 gap-2">
        <SubmitButton onClick={handleSubmit} isPending={isPending}>Confirm</SubmitButton>
        <CancelButton onClick={close}/>
      </div>
    </Modal>
  );
};
