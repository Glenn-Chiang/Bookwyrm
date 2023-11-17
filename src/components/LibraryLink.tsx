import { User } from "@prisma/client";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';

type LibraryLinkProps = {
  ownerId: number
  ownerName?: string
  isOwner: boolean,
}

export const LibraryLink = ({isOwner, ownerId, ownerName}: LibraryLinkProps) => {
  return (
    <Link
      href={`/library/${ownerId}`}
      className="text-sky-500 hover:bg-sky-100 rounded-md p-2 font-medium flex gap-2 items-center w-min sm:w-max"
    >
      <FontAwesomeIcon icon={faChevronLeft} />
      {isOwner ? 'Your' : `${ownerName}'s`} Library
    </Link>
  );
}