import { getUserBooks } from "@/actions/userBooks";
import { BookEntry } from "./components/BookEntry";
import { FilterMenu } from "./components/FilterMenu";
import { SortDropdown } from "./components/SortDropdown";
import Link from "next/link";
import { getUserShelves } from "@/actions/shelves";
import { getCurrentUser } from "@/lib/auth";

export default async function Library({
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
    <main className="flex flex-col gap-2 items-center w-full pt-8">
      <h1 className="text-center pt-4">Library</h1>
      <Link
        href={`/library/${userId}/shelves`}
        className="text-sky-500 hover:text-sky-400 font-medium"
      >
        View shelves
      </Link>
      <FilterMenu />
      <p className="text-slate-500 text-center">
        Showing {books.length} book{books.length !== 1 ? "s" : ""}
      </p>
      <SortDropdown />
      {books.length ? (
        <ul className="w-full grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3">
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
