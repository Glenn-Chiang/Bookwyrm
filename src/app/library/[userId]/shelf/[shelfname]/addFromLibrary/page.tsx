import { getUserBooks } from "@/actions/userBooks";
import { Modal } from "@/components/Modal";
import { BookItem } from "./components/BookItem";

export default async function BrowseLibrary({
  params,
}: {
  params: { userId: string; shelfname: string };
}) {
  const userId = Number(params.userId);
  const shelfname = params.shelfname;
  const books = await getUserBooks(userId);
  const booksNotInShelf = books.filter(
    (book) => !book.shelves.map((shelf) => shelf.shelfname).includes(shelfname)
  );

  return (
    <div className="flex flex-col gap-4 items-center w-full">
      <h2 className="text-center">
        Add books from your library to{" "}
        <span className="text-sky-500 font-medium">{shelfname}</span>
      </h2>
      <p className="text-slate-500 text-center">Your books that are already in this shelf will not be shown</p>
      {booksNotInShelf.length ? (
        <ul className="w-3/4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10 ">
          {booksNotInShelf.map((book) => (
            <BookItem key={book.bookId} book={book.book} />
          ))}
        </ul>
      ) : (
        <p className="text-center bg-slate-500">
          All your books are already in this shelf
        </p>
      )}
      <div className="flex gap-2 "></div>
    </div>
  );
}
