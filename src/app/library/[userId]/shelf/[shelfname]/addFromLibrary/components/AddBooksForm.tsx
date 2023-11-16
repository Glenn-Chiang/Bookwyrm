"use client";

import { addBooksToShelf } from "@/actions/shelfBooks";
import { CancelButton, SubmitButton } from "@/components/buttons";
import { serializeStringToUrl } from "@/lib/helpers/serializeUrlParam";
import { UserBookDetail } from "@/lib/types";
import { Book } from "@prisma/client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

type AddBooksFormProps = {
  books: UserBookDetail[];
  shelfname: string;
};

export const AddBooksForm = ({
  books,
  shelfname,
}: AddBooksFormProps) => {
  const [selectedBooks, setSelectedBooks] = useState<string[]>([]); // List of selected bookIds

  const handleSelect = (bookId: string) => {
    // Unselect if already selected
    if (selectedBooks.includes(bookId)) {
      setSelectedBooks((selectedBooks) =>
        selectedBooks.filter((selectedBook) => selectedBook !== bookId)
      );
      // Select if not already selected
    } else {
      setSelectedBooks((selectedBooks) => [...selectedBooks, bookId]);
    }
  };

  const [isPending, setIsPending] = useState(false);
  const router = useRouter();

  const handleSubmit = async () => {
    setIsPending(true);
    await addBooksToShelf(shelfname, selectedBooks)
    router.push(`../${serializeStringToUrl(shelfname)}`)
    console.log('Added books to shelf')
  };

  return (
    <>
      <ul className="py-4 sm:w-4/5 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10 ">
        {books.map((book) => (
          <BookItem
            key={book.bookId}
            book={book.book}
            selected={selectedBooks.includes(book.bookId)}
            onClick={() => handleSelect(book.bookId)}
          />
        ))}
      </ul>
      <div className="flex flex-col gap-2 w-full fixed bottom-0 p-4 bg-slate-50 drop-shadow z-10">
        <p className="text-center text-slate-500 pb-2">
          Selected {selectedBooks.length} books. Add them to{" "}
          <span className="text-sky-500">{shelfname}</span>?
        </p>
        <div className="flex justify-center gap-2 w-full">
          <SubmitButton isPending={isPending} onClick={handleSubmit}>
            Confirm
          </SubmitButton>
          <CancelButton onClick={() => router.back()} />
        </div>
      </div>
    </>
  );
};

type BookItemProps = {
  book: Book;
  selected: boolean;
  onClick: () => void;
};

export const BookItem = ({ book, selected, onClick }: BookItemProps) => {
  const { id: bookId, thumbnail, title, authors } = book;
  return (
    <li
      onClick={onClick}
      className={`transition flex flex-col items-center gap-4 py-2 px-4 rounded-md ${
        selected ? "bg-sky-200 text-sky-600 font-medium" : "hover:bg-sky-100"
      }`}
    >
      <span className="text-center">{book.title}</span>
      {thumbnail && (
        <Image
          src={thumbnail}
          alt=""
          width={100} // this is arbitrary. we are using css to set the size
          height={100} // this is arbitrary. we are using css to set the size
          className="rounded w-full max-h-full"
        />
      )}
    </li>
  );
};
