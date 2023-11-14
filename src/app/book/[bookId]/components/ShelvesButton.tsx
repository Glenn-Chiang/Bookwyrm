"use client";

import { BookData } from "@/lib/types";

type ShelvesButtonProps = {
  onClick: () => void;
};

export const ShelvesButton = ({ onClick}: ShelvesButtonProps) => {
  return (
    <>
      <button
        onClick={onClick}
        className="bg-sky-100 text-sky-500 hover:bg-sky-200 hover:text-sky-600"
      >
        Manage Shelves
      </button>
    </>
  );
};
