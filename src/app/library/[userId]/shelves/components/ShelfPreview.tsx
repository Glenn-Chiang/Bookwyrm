import { getShelfBooks } from "@/actions/shelfBooks";
import { Book } from "@prisma/client";
import Image from "next/image";

type ShelfPreviewProps = {
  userId: number;
  shelfname: string;
};

export const ShelfPreview = async ({
  userId,
  shelfname,
}: ShelfPreviewProps) => {
  const shelfBooks = await getShelfBooks(userId, shelfname);

  return (
    <section className="w-full flex flex-col gap-4 ">
      <h2>{shelfname}</h2>
      {shelfBooks.length ? (
        <ul className="bg-slate-100 flex justify-center">
          {shelfBooks.map((shelfBook) => (
            <ShelfBookPreview
              key={shelfBook.bookId}
              book={shelfBook.userBook.book}
            />
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
    <li className="w-full">
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
