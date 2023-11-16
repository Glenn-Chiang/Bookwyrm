import { getUserBooks } from "@/actions/userBooks";
import { AddBooksForm } from "./components/AddBooksForm";
import { parseParamFromUrl } from "@/lib/helpers/serializeUrlParam";

export default async function BrowseLibrary({
  params,
}: {
  params: { userId: string; shelfname: string };
}) {
  const userId = Number(params.userId);
  const shelfname = parseParamFromUrl(params.shelfname);
  const allBooks = await getUserBooks(userId);
  // Only render books in library that are not in this shelf
  const books = allBooks.filter(
    (book) => !book.shelves.map((shelf) => shelf.shelfname).includes(shelfname)
  );

  return (
    <div className="flex flex-col gap-4 items-center w-full">
      <h2 className="text-center">
        Add books from your library to{" "}
        <span className="text-sky-500 font-medium">{shelfname}</span>
      </h2>
      <p className="text-slate-500 text-center">
        Your books that are already in this shelf will not be shown
      </p>
      {books.length ? (
        <AddBooksForm books={books} shelfname={shelfname}/>
      ) : (
        <p className="text-center bg-slate-500">
          All your books are already in this shelf
        </p>
      )}
    </div>
  );
}
