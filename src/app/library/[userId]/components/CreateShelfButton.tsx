"use client"

import { useState } from "react";
import { CreateShelfModal } from "./CreateShelfModal";

export const CreateShelfButton = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setModalIsOpen(true)}
        className="bg-sky-100 text-sky-500 hover:bg-sky-200 hover:text-sky-600 w-full sm:w-1/2 m-auto"
      >
        Create shelf
      </button>
      {modalIsOpen && <CreateShelfModal close={() => setModalIsOpen(false)}/>}
    </>
  );
};
