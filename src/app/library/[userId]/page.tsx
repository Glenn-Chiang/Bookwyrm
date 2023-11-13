import { getUserBooks } from "@/actions/userBooks";
import { BookEntry } from "./components/BookEntry";
import { FilterMenu } from "./components/FilterMenu";
import { ReadStatus } from "@/lib/types";

export default async function Library({
  params,
  searchParams,
}: {
  params: { userId: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const userId = Number(params.userId);
  const statusFilter = searchParams.status === 'all' ? undefined : searchParams.status
  const books = await getUserBooks(userId, statusFilter);

  return (
    <>
      <h1 className="text-center pt-4">Library</h1>
      <FilterMenu />
      <ul className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3">
        {books.map((book) => (
          <BookEntry key={book.bookId} userBook={book} />
        ))}
      </ul>
    </>
  );
}
