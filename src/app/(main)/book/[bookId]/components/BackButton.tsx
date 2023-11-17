"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";

export const BackButton = () => {
  const router = useRouter();
  const handleClick = () => {
    router.back();
  };
  return (
    <button
      onClick={handleClick}
      className="w-max self-start p-2 flex gap-2 items-center rounded-md text-sky-500 hover:bg-sky-100 shadow-none"
    >
      <FontAwesomeIcon icon={faChevronLeft} />
      Back
    </button>
  );
};
