import { getUserBooks } from "@/actions/userBooks";
import { BookEntry } from "@/components/BookEntry";
import { FilterMenu } from "@/components/FilterMenu";
import { SortDropdown } from "@/components/SortDropdown";
import Link from "next/link";
import { getUserShelves } from "@/actions/shelves";
import { getCurrentUser } from "@/lib/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

export default async function LibraryBooks({
  params,
  searchParams,
}: {
  params: { userId: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const userId = Number(params.userId);

  const sortParam = searchParams.sort;
  const statusFilter =
    searchParams.status === "all" ? undefined : searchParams.status;

  const books = await getUserBooks(userId, statusFilter, sortParam);

  const currentUser = await getCurrentUser();
  const shelves = await getUserShelves(currentUser.id);

  return (
    <main className="flex flex-col gap-2 items-center w-full pt-8 relative">
      <h1 className="text-center pt-4">All Books</h1>
      <nav className="absolute left-0 flex flex-col pt-4">
        <Link
          href={`/library/${userId}`}
          className="text-sky-500 hover:bg-sky-100 rounded-md p-2 font-medium flex gap-2 items-center"
        >
          <FontAwesomeIcon icon={faChevronLeft} />
          Library
        </Link>
      </nav>
      <FilterMenu />
      <p className="text-slate-500 text-center">
        Showing {books.length} book{books.length !== 1 ? "s" : ""}
      </p>
      <SortDropdown />
      {books.length ? (
        <ul className="w-full grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 ">
          {books.map((book) => (
            <BookEntry key={book.bookId} userBook={book} shelves={shelves} />
          ))}
        </ul>
      ) : (
        <p className="text-slate-500 text-center">No books to display</p>
      )}
    </main>
  );
}
