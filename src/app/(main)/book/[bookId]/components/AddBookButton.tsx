"use client";

import { VolumeInfo } from "@/lib/books-api/types";
import { useState } from "react";
import { AddBookModal } from "./AddBookModal";
import { BookData } from "@/lib/types";

type AddBookButtonProps = {
  bookData: BookData;
};

export const AddBookButton = ({ bookData }: AddBookButtonProps) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setModalIsOpen(true)}
        className="bg-sky-100 hover:bg-sky-200 text-sky-500 hover:text-sky-600 font-medium"
      >
        Add to Library
      </button>
      {modalIsOpen && <AddBookModal bookData={bookData} close={() => setModalIsOpen(false)}/>}
    </>
  );
};
