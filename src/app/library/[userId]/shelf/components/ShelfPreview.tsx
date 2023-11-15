import { getShelfBooks } from "@/actions/shelfBooks";
import { getUserBooks } from "@/actions/userBooks";
import { Book, Shelf } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

type ShelfPreviewProps = {
  userId: number;
  shelfname?: string;
};

export const ShelfPreview = async ({
  shelfname,
  userId,
}: ShelfPreviewProps) => {
  // If shelfname is not passed as prop, get all books in library. This will act as a 'All' shelf, even if it is not an actual shelf.
  const books = shelfname
    ? (await getShelfBooks(userId, shelfname)).map((book) => book.userBook)
    : await getUserBooks(userId);

  const shelfUrl = shelfname
    ? `/library/${userId}/shelf/${shelfname}`
    : `/library/${userId}/all`;

  return (
    <section className="w-full flex flex-col gap-2 ">
      <div className="flex gap-4 items-center ">
        <h2 className="hover:text-sky-500">
          <Link href={shelfUrl}>{shelfname || "All"}</Link>
        </h2>
        <span className="text-slate-500">{books.length} books</span>
      </div>
      <Link href={shelfUrl} className="text-sky-500 hover:text-sky-400 w-max">
        View shelf
      </Link>
      {books.length ? (
        <ul className="bg-slate-200 p-2 rounded-md flex justify-start gap-2 w-full overflow-x-scroll">
          {books.map((book) => (
            <ShelfBookPreview key={book.bookId} book={book.book} />
          ))}
        </ul>
      ) : (
        <p className="text-slate-500">No books in this shelf</p>
      )}
    </section>
  );
};

const ShelfBookPreview = ({ book }: { book: Book }) => {
  return (
    <li className="w-1/5 lg:w-1/6 flex-shrink-0">
      {book.thumbnail && (
        <Image
          src={book.thumbnail}
          alt=""
          width={100}
          height={100}
          className="rounded w-full h-auto"
        />
      )}
    </li>
  );
};
