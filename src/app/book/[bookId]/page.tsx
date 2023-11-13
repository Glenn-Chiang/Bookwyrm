import { VolumeInfo, VolumeData } from "@/lib/books-api/types";
import Image from "next/image";
import { AddBookButton } from "./components/AddBookButton";
import { BookData } from "@/lib/types";

const getVolumeInfo = async (bookId: string) => {
  const res = await fetch(
    `https://www.googleapis.com/books/v1/volumes/${bookId}?key=${process.env.BOOKS_API_KEY}`
  );
  const volumeInfo: VolumeInfo = (await res.json()).volumeInfo
  return volumeInfo;
};

export default async function BookPage({
  params,
}: {
  params: { bookId: string };
}) {
  const bookId = params.bookId;
  const volumeInfo = await getVolumeInfo(bookId);

  const {
    title,
    authors,
    publisher,
    publishedDate,
    pageCount,
    imageLinks,
    description,
    categories,
  } = volumeInfo;

  const bookData: BookData = {id: bookId, title, authors, thumbnail: imageLinks?.thumbnail}

  return (
    <main className="flex flex-col gap-4 items-center sm:flex-row sm:items-start">
      <section className="flex flex-col gap-4">
        {imageLinks && (
          <Image
            src={imageLinks.large || imageLinks.thumbnail}
            alt=""
            width={240}
            height={400}
            className="rounded "
          />
        )}
        <AddBookButton bookData={bookData} />
      </section>
      <section className="flex flex-col w-full p-4 gap-4">
        <h1 className="text-center sm:text-start">{title}</h1>
        {authors && <div className="text-xl">{authors.join(", ")}</div>}
        <div className="text-slate-500 gap-2 flex">
          {publisher && <span>{publisher}</span>}
          {publishedDate && <span>({publishedDate})</span>}
        </div>

        <div className="text-slate-500">{categories.join(", ")}</div>

        <div className="text-slate-500">{pageCount} pages</div>

        {description && <p className="">{stripTags(description)}</p>}
      </section>
    </main>
  );
}

const stripTags = (text: string) => {
  return text.replace(/<\/?[^>]+(>|$)/g, "");
};
