"use client";

import { ActionButton } from "@/components/buttons";
import { useState } from "react";
import { DeleteShelfModal } from "./DeleteShelfModal";
import { RenameShelfModal } from "./RenameShelfModal";

type ActionSectionProps = {
  shelfname: string;
};

export const ActionSection = ({ shelfname }: ActionSectionProps) => {
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const [renameModalIsOpen, setRenameModalIsOpen] = useState(false);
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);

  return (
    <>
      <ActionButton onClick={() => setMenuIsOpen(prev => !prev)} />
      {menuIsOpen && (
        <ActionMenu
          handleRename={() => setRenameModalIsOpen(true)}
          handleDelete={() => setDeleteModalIsOpen(true)}
        />
      )}
      {renameModalIsOpen && <RenameShelfModal shelfname={shelfname} close={() => setRenameModalIsOpen(false)}/>}
      {deleteModalIsOpen && <DeleteShelfModal shelfname={shelfname} close={() => setDeleteModalIsOpen(false)}/>}
    </>
  );
};

type ActionMenuProps = {
  handleRename: () => void;
  handleDelete: () => void;
};

const ActionMenu = ({ handleRename, handleDelete }: ActionMenuProps) => {
  return (
    <menu className="z-10 absolute right-10 rounded bg-slate-100 shadow flex flex-col">
      <button
        onClick={handleRename}
        className="rounded-t rounded-b-none p-2 text-slate-500 hover:bg-slate-200 hover:text-slate-600 shadow-none"
      >
        Rename shelf
      </button>
      <button
        onClick={handleDelete}
        className="rounded-b rounded-t-none p-2 text-slate-500 hover:bg-slate-200 hover:text-slate-600 shadow-none"
      >
        Delete shelf
      </button>
    </menu>
  );
};
