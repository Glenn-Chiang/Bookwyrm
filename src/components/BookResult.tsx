import Image from "next/image";
import { VolumeInfo } from "@/lib/books-api/types";
import Link from "next/link";

export const BookResult = ({ book }: { book: VolumeInfo }) => {
  const { title, authors, publisher, publishedDate, imageLinks } = book;
  return (
    <Link href={`/book/${book.id}`} className="flex bg-slate-100 shadow rounded-xl p-4 hover:shadow-md hover:bg-sky-100 hover:text-sky-600 transition">
      {imageLinks && imageLinks.thumbnail && (
        <Image src={imageLinks.thumbnail} alt="" width={100} height={200} className="rounded"/>
      )}
      <div className="flex flex-col items-center w-full">
        <h2 className="text-center">{title}</h2>
        {authors && <div>{authors.join(", ")}</div>}
        {publisher && <div className="text-slate-500">{publisher}</div> }
      </div>
    </Link>
  );
};
