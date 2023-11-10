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
    ratingsCount,
    averageRating
  } = bookData;

  return (
    <main className="flex flex-col gap-4 items-center sm:flex-row sm:items-start">
      {imageLinks && imageLinks.large && (
        <Image
          src={imageLinks.large}
          alt=""
          width={200}
          height={400}
          className="rounded w-48 h-80"
        />
      )}
      <div className="flex flex-col w-full p-4 gap-4">
        <h1>{title}</h1>
        {authors && <div className="text-xl">{authors.join(", ")}</div>}
        {publisher && <div className="text-slate-500">{publisher}</div>}
        {description && <p className="">{stripTags(description)}</p>}
      </div>
    </main>
  );
}

const stripTags = (text: string) => {
  return text.replace(/<\/?[^>]+(>|$)/g, '');
}