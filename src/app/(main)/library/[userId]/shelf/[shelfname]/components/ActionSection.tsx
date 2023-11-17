"use client";

import { ActionButton } from "@/components/buttons";
import { useState, useRef, useEffect } from 'react';
import { DeleteShelfModal } from "./DeleteShelfModal";
import { RenameShelfModal } from "./RenameShelfModal";

type ActionSectionProps = {
  shelfname: string;
};

export const ActionSection = ({ shelfname }: ActionSectionProps) => {
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const [renameModalIsOpen, setRenameModalIsOpen] = useState(false);
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);
  // Enables closing of menu by clicking outside
  const hideMenu = (event: MouseEvent) => {
    if (
      menuRef.current &&
      event.target instanceof Node &&
      !menuRef.current.contains(event.target)
    ) {
      setMenuIsOpen(false);
    }
  };

  useEffect(() => {
    if (menuIsOpen) {
      document.addEventListener("click", hideMenu);
    } else {
      document.removeEventListener("click", hideMenu);
    }

    return () => document.removeEventListener("click", hideMenu);
  }, [menuIsOpen]);
  return (
    <>
      <ActionButton onClick={() => setMenuIsOpen(prev => !prev)} />
      {menuIsOpen && (
        <div ref={menuRef}>
          <ActionMenu
            handleRename={() => setRenameModalIsOpen(true)}
            handleDelete={() => setDeleteModalIsOpen(true)}
          />
        </div>
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
// TODO: Fix bug where ActionMenu renders over FilterMenu despite z-index
const ActionMenu = ({ handleRename, handleDelete }: ActionMenuProps) => {
  return (
    <menu className="w-max z-30 absolute right-10 rounded bg-slate-100 shadow flex flex-col">
      <button
        onClick={handleRename}
        className="z-30 rounded-t rounded-b-none p-2 text-slate-500 hover:bg-slate-200 hover:text-slate-600 shadow-none"
      >
        Rename shelf
      </button>
      <button
        onClick={handleDelete}
        className="rounded-b rounded-t-none p-2 text-red-500 hover:bg-slate-200 shadow-none"
      >
        Delete shelf
      </button>
    </menu>
  );
};
