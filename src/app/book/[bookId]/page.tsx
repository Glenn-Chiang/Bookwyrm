import { getUserBook } from "@/actions/userBooks";
import { VolumeInfo } from "@/lib/books-api/types";
import { stripTags } from "@/lib/helpers/stripTags";
import { BookData } from "@/lib/types";
import Image from "next/image";
import { ActionsMenu } from "./components/ActionsMenu";
import { getShelves } from "@/actions/shelves";
import { getCurrentUser } from '../../../lib/auth';

const getVolumeInfo = async (bookId: string) => {
  const res = await fetch(
    `https://www.googleapis.com/books/v1/volumes/${bookId}?key=${process.env.BOOKS_API_KEY}`
  );
  const volumeInfo: VolumeInfo = (await res.json()).volumeInfo;
  return volumeInfo;
};

export default async function BookPage({
  params,
}: {
  params: { bookId: string };
}) {
  const bookId = params.bookId;
  const volumeInfo = await getVolumeInfo(bookId); // Static data about book fetched from google-books-api
  const userBook = await getUserBook(bookId); // Dynamic data about book specific to this user

  const { title, authors, imageLinks } = volumeInfo;

  const bookData: BookData = {
    id: bookId,
    title,
    authors,
    thumbnail: imageLinks?.large || imageLinks?.thumbnail,
  };

  const currentUser = await getCurrentUser()
  const shelves = await getShelves(currentUser.id)

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
        <ActionsMenu userBook={userBook} bookData={bookData} shelves={shelves}/>
      </section>
      <InfoSection volumeInfo={volumeInfo} />
    </main>
  );
}

const InfoSection = ({ volumeInfo }: { volumeInfo: VolumeInfo }) => {
  const {
    title,
    authors,
    publisher,
    publishedDate,
    pageCount,
    description,
    categories,
  } = volumeInfo;
  return (
    <section className="flex flex-col w-full p-4 gap-4">
      <h1 className="text-center sm:text-start">{title}</h1>
      {authors && <div className="text-xl">{authors.join(", ")}</div>}
      <div className="text-slate-500 gap-2 flex">
        {publisher && <span>{publisher}</span>}
        {publishedDate && <span>({publishedDate})</span>}
      </div>

      {categories && (
        <div className="text-slate-500">{categories.join(", ")}</div>
      )}

      <div className="text-slate-500">{pageCount} pages</div>

      {description && <p className="">{stripTags(description)}</p>}
    </section>
  );
};
