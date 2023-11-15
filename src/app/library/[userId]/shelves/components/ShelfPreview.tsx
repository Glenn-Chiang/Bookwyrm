import { getShelfBooks } from "@/actions/shelfBooks";
import { Book, Shelf } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

export const ShelfPreview = async ({ shelf }: { shelf: Shelf }) => {
  const shelfBooks = await getShelfBooks(shelf.creatorId, shelf.shelfname);

  return (
    <section className="w-full flex flex-col gap-2 ">
      <div className="flex gap-4 items-center ">
        <h2 className="hover:text-sky-500">
          <Link href={shelf.shelfname}>{shelf.shelfname}</Link>
        </h2>
        <span className="text-slate-500">{shelfBooks.length} books</span>
      </div>
      <Link href={shelf.shelfname} className="text-sky-500 hover:text-sky-400 w-max">View shelf</Link>
      {shelfBooks.length ? (
        <ul className="bg-slate-200 p-2 rounded-md flex justify-start gap-2 w-full overflow-x-scroll">
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
    <li className="w-1/5 flex-shrink-0">
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
