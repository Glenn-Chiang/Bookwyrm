import { getUserBooks } from "@/actions/userBooks";
import { BookEntry } from "./BookEntry";

export default async function Library({
  params,
}: {
  params: { userId: string };
}) {
  const userId = Number(params.userId);
  const books = await getUserBooks(userId);

  return (
    <>
      <h1 className="text-center p-4">Library</h1>
      <ul className="flex flex-col w-full">
        {books.map((book) => (
          <BookEntry key={book.bookId} userBook={book} />
        ))}
      </ul>
    </>
  );
}
