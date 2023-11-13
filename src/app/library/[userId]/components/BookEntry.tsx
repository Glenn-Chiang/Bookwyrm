import { updateBookRating, updateBookStatus } from "@/actions/userBooks";
import { RatingDropdown } from "@/components/RatingDropdown";
import { StatusDropdown } from "@/components/StatusDropdown";
import { ReadStatus, UserBookDetail } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";

type BookEntryProps = {
  userBook: UserBookDetail;
};

export const BookEntry = ({ userBook }: BookEntryProps) => {
  const { id: bookId, thumbnail, title, authors } = userBook.book;

  const handleStatusChange = async (status: ReadStatus) => {
    "use server";
    await updateBookStatus(bookId, status)
  };

  const handleRatingChange = async (rating: number | null) => {
    "use server";
    await updateBookRating(bookId, rating)
  };

  return (
    <article className="flex gap-4 p-4 ">
      {thumbnail && (
        <Link href={`/book/${bookId}`} >
          <Image
            src={thumbnail}
            alt=""
            width={112}
            height={160}
            className="rounded w-28 "
          />
        </Link>
      )}
      <div className="flex flex-col gap-4">
        <div>
          <Link href={`/book/${bookId}`} className="hover:text-sky-500">
            <h2>{title}</h2>
          </Link>
          <div>{authors.join(", ")}</div>
        </div>
        <div className="flex flex-col gap-2">
          <StatusDropdown
            defaultValue={userBook.status as ReadStatus}
            handleChange={handleStatusChange}
          />
          {userBook.status === "completed" && (
            <RatingDropdown
              defaultValue={userBook.rating}
              handleChange={handleRatingChange}
            />
          )}
        </div>
      </div>
    </article>
  );
};
