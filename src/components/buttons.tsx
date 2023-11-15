import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

type SubmitButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  isPending: boolean;
};

export const SubmitButton = ({
  onClick,
  isPending,
  children,
}: SubmitButtonProps) => {
  return (
    <button
      type="submit"
      onClick={onClick}
      className={`w-full flex gap-2 justify-center items-center bg-sky-100 text-sky-500 font-medium hover:text-sky-600 hover:bg-sky-200 ${
        isPending && "opacity-50"
      }`}
      disabled={isPending}
    >
      {isPending && (
        <FontAwesomeIcon icon={faSpinner} className="animate-spin" />
      )}
      {children}
    </button>
  );
};

type CancelButtonProps = {
  onClick: () => void;
};

export const CancelButton = ({ onClick }: CancelButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-600 "
    >
      Cancel
    </button>
  );
};

export const ActionButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <button
      onClick={onClick}
      className="absolute bottom-1 sm:bottom-4 right-0 sm:right-4 p-2 rounded-full w-8 h-8 shadow-none hover:bg-slate-200 flex justify-center items-center"
    >
      <FontAwesomeIcon icon={faEllipsisV} />
    </button>
  );
};
