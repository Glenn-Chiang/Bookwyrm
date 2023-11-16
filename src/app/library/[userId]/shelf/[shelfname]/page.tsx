import { getShelfBooks } from "@/actions/shelfBooks";
import { getUserShelf, getUserShelves } from "@/actions/shelves";
import { BookEntry } from "@/components/BookEntry";
import { FilterMenu } from "@/components/FilterMenu";
import { SortDropdown } from "@/components/SortDropdown";
import { getCurrentUser } from "@/lib/auth";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

// TODO:Remove shelf, edit shelfname

export default async function ShelfPage({
  params,
}: {
  params: { userId: string; shelfname: string };
}) {
  const userId = Number(params.userId);
  const shelfname = params.shelfname;
  const shelf = await getUserShelf(userId, shelfname);
  const books = await getShelfBooks(userId, shelfname);
  const currentUser = await getCurrentUser();
  const shelves = await getUserShelves(currentUser.id);

  return (
    <main className="flex flex-col gap-4 items-center w-full relative">
      <h1 className="text-center pt-4">{shelfname}</h1>
      <nav className="absolute left-0 flex flex-col pt-4">
        <Link
          href={`/library/${userId}`}
          className="text-sky-500 hover:bg-sky-100 rounded-md p-2 font-medium flex gap-2 items-center"
        >
          <FontAwesomeIcon icon={faChevronLeft} />
          Library
        </Link>
      </nav>

      <Link
        href={`${shelfname}/addFromLibrary`}
        className="bg-sky-100 text-sky-500 hover:bg-sky-200 hover:text-sky-600 p-2 rounded-md"
      >
        Add books from your library
      </Link>

      <FilterMenu />
      <p className="text-slate-500 text-center">
        Showing {books.length} book{books.length !== 1 ? "s" : ""}
      </p>
      <SortDropdown />
      {books.length ? (
        <ul className="w-full grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3">
          {books.map((book) => (
            <BookEntry
              key={book.bookId}
              userBook={book.userBook}
              shelves={shelves}
            />
          ))}
        </ul>
      ) : (
        <p className="text-slate-500 text-center">No books in this shelf</p>
      )}
    </main>
  );
}
