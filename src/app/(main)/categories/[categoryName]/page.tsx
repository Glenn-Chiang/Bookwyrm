import { VolumeResult } from "@/components/VolumeResult";
import { VolumeData } from "@/lib/books-api/types";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: { categoryName: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const category = params.categoryName;
  const pageNumber = searchParams.page ? Number(searchParams.page) : 0;
  const volumes = await getVolumesBySubject(category, pageNumber);
  
  const prevPage = pageNumber ? pageNumber - 1 : 0; // prevent going to page -1 if user is at page 0
  const nextPage = volumes.length ? pageNumber + 1 : pageNumber; // prevent going to next page if there are no more results

  return (
    <>
      <div className="flex justify-between py-2">
        <Link
          href={`?page=${prevPage}`}
          className="flex gap-2 items-center p-2 rounded-md bg-sky-100 text-sky-500"
        >
          <FontAwesomeIcon icon={faChevronLeft} />
          Prev
        </Link>
        <Link
          href={`?page=${nextPage}`}
          className="flex gap-2 items-center p-2 rounded-md bg-sky-100 text-sky-500"
        >
          Next
          <FontAwesomeIcon icon={faChevronRight} />
        </Link>
      </div>
      {
        volumes.length ?
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
        {volumes.map((volume) => (
          <VolumeResult
            key={volume.id}
            volumeId={volume.id}
            volumeInfo={volume}
          />
        ))}
      </ul>
        : <p className="text-center text-slate-500">No books to display</p>
      }
    </>
  );
}

export const getVolumesBySubject = async (
  subject: string,
  pageNumber: number
) => {
  const maxResults = 40;
  const res = await fetch(
    `https://www.googleapis.com/books/v1/volumes?q=subject:${subject}&startIndex=${
      pageNumber * maxResults
    }&maxResults=${maxResults}&key=${process.env.BOOKS_API_KEY}`
  );
  const volumeResults: VolumeData[] = (await res.json()).items;
  const volumes = volumeResults
    ? volumeResults.map((item) => {
        return { ...item.volumeInfo, id: item.id };
      })
    : [];
  return volumes;
};
