import { getShelfBooks } from "@/actions/shelfBooks";
import { getUserShelf, getUserShelves } from "@/actions/shelves";
import { BookEntry } from "@/components/BookEntry";
import { FilterMenu } from "@/components/FilterMenu";
import { SortDropdown } from "@/components/SortDropdown";
import { ActionButton } from "@/components/buttons";
import { getCurrentUser } from "@/lib/auth";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { ActionSection } from "./components/ActionSection";
import {
  parseParamFromUrl,
  serializeStringToUrl,
} from "@/lib/helpers/serializeUrlParam";
import { LibraryLink } from "@/components/LibraryLink";
import { getUser } from "@/actions/users";

export default async function ShelfPage({
  params,
  searchParams,
}: {
  params: { userId: string; shelfname: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const userId = Number(params.userId);
  const shelfname = parseParamFromUrl(params.shelfname);

  const sortParam = searchParams.sort;
  const statusFilter =
    searchParams.status === "all" ? undefined : searchParams.status;

  const owner = await getUser(userId)
  const books = await getShelfBooks(userId, shelfname, statusFilter, sortParam);

  const currentUser = await getCurrentUser();
  const shelves = await getUserShelves(currentUser.id);
  const isOwner = currentUser.id === userId;

  return (
    <main className="flex flex-col gap-4 items-center w-full ">
      <div className="sticky top-0 z-20 bg-white w-screen h-16 px-4 ">
        <div className="absolute bottom-2">
          <LibraryLink ownerId={userId} ownerName={owner?.username} isOwner={isOwner}/>
        </div>
        <h1 className="text-center pt-4">{shelfname}</h1>

        {isOwner && (
          <div className="absolute right-2 bottom-2">
            <ActionSection shelfname={shelfname} />
          </div>
        )}
      </div>

      {isOwner && (
        <Link
          href={`${serializeStringToUrl(shelfname)}/addFromLibrary`}
          className="bg-sky-100 text-sky-500 hover:bg-sky-200 hover:text-sky-600 p-2 rounded-md"
        >
          Add books from your library
        </Link>
      )}

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
