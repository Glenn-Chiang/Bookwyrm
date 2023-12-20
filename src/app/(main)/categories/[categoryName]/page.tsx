import { VolumeResult } from "@/components/VolumeResult";
import { VolumeData } from "@/lib/books-api/types";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { Paginator } from "../components/Paginator";

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
      <Paginator prevPage={prevPage} nextPage={nextPage}/>
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
      <Paginator prevPage={prevPage} nextPage={nextPage}/>
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
