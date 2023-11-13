import { updateBookRating, updateBookStatus } from "@/actions/userBooks";
import { RatingDropdown } from "@/components/RatingDropdown";
import { StatusDropdown } from "@/components/StatusDropdown";
import { ReadStatus, UserBookDetail } from "@/lib/types";
import Image from "next/image";

type BookEntryProps = {
  userBook: UserBookDetail;
};

export const BookEntry = ({ userBook }: BookEntryProps) => {
  const { thumbnail, title, authors } = userBook.book;

  const handleStatusChange = async (status: ReadStatus) => {
    "use server";
    await updateBookStatus(userBook.bookId, status)
  };

  const handleRatingChange = async (rating: number | null) => {
    "use server";
    await updateBookRating(userBook.bookId, rating)
  };

  return (
    <article className="flex gap-4 p-4 w-full">
      {thumbnail && (
        <Image
          src={thumbnail}
          alt=""
          width={100}
          height={200}
          className="rounded w-28 h-40"
        />
      )}
      <div className="flex flex-col gap-4">
        <div>
          <h2>{title}</h2>
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
