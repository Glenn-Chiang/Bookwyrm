import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

export const Paginator = ({
  prevPage,
  nextPage,
}: {
  prevPage: number;
  nextPage: number;
}) => {
  return (
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
  );
};
