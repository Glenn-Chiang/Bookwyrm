import Image from "next/image";
import { VolumeInfo } from "@/lib/books-api/types";
import Link from "next/link";

type VolumeResultProps = {
  volumeId: string
  volumeInfo: VolumeInfo
}

export const VolumeResult = ({volumeId, volumeInfo}: VolumeResultProps) => {
  const { title, authors, publisher, publishedDate, imageLinks } = volumeInfo;
  return (
    <Link
      href={`/book/${volumeId}`}
      className="w-full flex justify-center gap-2 bg-slate-100 shadow rounded-xl p-4 hover:shadow-md hover:bg-sky-100 hover:text-sky-600 transition"
    >
      {imageLinks && (
        <Image
          src={imageLinks.large || imageLinks.thumbnail}
          alt=""
          width={100}
          height={100}
          className="rounded w-1/4 h-auto"
        />
      )}
      <div className="flex flex-col items-center w-3/4">
        <h2 className="text-center">{title}</h2>
        {authors && <div className="text-center">{authors.join(", ")}</div>}
        {publisher && <div className="text-slate-500 text-center">{publisher}</div>}
      </div>
    </Link>
  );
};
