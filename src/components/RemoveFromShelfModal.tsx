import { FormEventHandler, useState } from "react";
import { Modal } from "./Modal";
import { CancelButton, SubmitButton } from "./buttons";
import { removeBookFromShelf } from "@/actions/shelfBooks";
import { Book } from "@prisma/client";

type RemoveFromShelfModalProps = {
  book: Book;
  shelfname: string;
  close: () => void;
};

export const RemoveFromShelfModal = ({
  book,
  shelfname,
  close,
}: RemoveFromShelfModalProps) => {
  const [isPending, setIsPending] = useState(false);
  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    setIsPending(true);
    event.preventDefault();

    await removeBookFromShelf(shelfname, book.id);
    console.log(`Removed ${book.title} from shelf ${shelfname}`);

    close()
    setIsPending(false);
  };

  return (
    <Modal>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <h2>
          Remove <span className="text-sky-500 font-medium">{book.title}</span> from{" "}
          <span className="text-sky-500 font-medium">{shelfname}</span>?
        </h2>
        <p className="text-slate-500">This book will remain in your library and its other shelves</p>
        <div className="flex gap-2">
          <SubmitButton isPending={isPending}>Confirm</SubmitButton>
          <CancelButton onClick={close} />
        </div>
      </form>
    </Modal>
  );
};
