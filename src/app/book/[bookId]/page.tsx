import { VolumeInfo } from "@/lib/books-api/types";
import Image from "next/image";

const getBookData = async (bookId: string) => {
  const res = await fetch(
    `https://www.googleapis.com/books/v1/volumes/${bookId}?key=${process.env.BOOKS_API_KEY}`
  );
  const bookData: VolumeInfo = (await res.json()).volumeInfo;
  console.log(bookData)
  return bookData;
};

export default async function BookPage({
  params,
}: {
  params: { bookId: string };
}) {
  const bookId = params.bookId;
  const bookData = await getBookData(bookId);

  const {
    title,
    authors,
    publisher,
    publishedDate,
    pageCount,
    imageLinks,
    description,
    categories,
  } = bookData;

  return (
    <main className="flex flex-col gap-4 items-center sm:flex-row sm:items-start">
      {imageLinks && (
        <Image
          src={imageLinks.large || imageLinks.thumbnail}
          alt=""
          width={200}
          height={400}
          className="rounded w-48 h-80"
        />
      )}
      <section className="flex flex-col w-full p-4 gap-4">
        <h1>{title}</h1>
        {authors && <div className="text-xl">{authors.join(", ")}</div>}
        <div className="text-slate-500 gap-2 flex">
          {publisher && <span>{publisher}</span>}
          {publishedDate && <span>({publishedDate})</span>}
        </div>

        <div className="text-slate-500">
          {categories.join(', ')}
        </div>

        <div className="text-slate-500">{pageCount} pages</div>

        {description && <p className="">{stripTags(description)}</p>}
      </section>
    </main>
  );
}

const stripTags = (text: string) => {
  return text.replace(/<\/?[^>]+(>|$)/g, '');
}