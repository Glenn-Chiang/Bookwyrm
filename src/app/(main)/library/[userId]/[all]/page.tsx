import { getUserShelves } from "@/actions/shelves";
import { getUserBooks } from "@/actions/userBooks";
import { getUser } from "@/actions/users";
import { BookEntry } from "@/components/BookEntry";
import { FilterMenu } from "@/components/FilterMenu";
import { LibraryLink } from "@/components/LibraryLink";
import { SortDropdown } from "@/components/SortDropdown";
import { getCurrentUser } from "@/lib/auth";

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
  const owner = await getUser(userId)

  const currentUser = await getCurrentUser();
  const isOwner = currentUser?.id === owner?.id
  const shelves = await getUserShelves(currentUser?.id);

  return (
    <main className="flex flex-col gap-2 items-center w-full relative">
      <div className="sticky top-0 z-20 bg-white w-screen h-16 sm:px-4 ">
        <div className="absolute bottom-2">
          <LibraryLink isOwner={isOwner} ownerId={userId} ownerName={owner?.username}/>
        </div>
        <h1 className="text-center pt-4">All Books</h1>
      </div>
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
