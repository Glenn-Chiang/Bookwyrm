import Image from "next/image";
import { VolumeInfo } from "@/lib/books-api/types";

export const BookResult = ({ book }: { book: VolumeInfo }) => {
  const { title, authors, publisher, publishedDate, imageLinks } = book;
  return (
    <article className="flex bg-slate-100 shadow rounded-xl p-4 hover:shadow-md hover:bg-sky-100 hover:text-sky-600 transition">
      {imageLinks && imageLinks.thumbnail && (
        <Image src={imageLinks.thumbnail} alt="" width={100} height={200} />
      )}
      <div className="flex flex-col items-center w-full">
        <h2>{title}</h2>
        <div>{authors ? authors.join(", ") : "-"}</div>
      </div>
    </article>
  );
};
