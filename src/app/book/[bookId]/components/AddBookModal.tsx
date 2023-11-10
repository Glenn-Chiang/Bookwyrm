"use client";

import { Modal } from "@/components/Modal";
import { CancelButton, SubmitButton } from "@/components/buttons";
import { VolumeInfo } from "@/lib/books-api/types";
import { ReadStatus } from "@/lib/types";
import { faStar } from "@fortawesome/free-regular-svg-icons";
import { faBarsProgress } from "@fortawesome/free-solid-svg-icons/faBarsProgress";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";

type AddBookModalProps = {
  bookData: VolumeInfo;
  close: () => void;
};

export const AddBookModal = ({ bookData, close }: AddBookModalProps) => {
  const [isPending, setIsPending] = useState(false);
  const [readStatus, setReadStatus] = useState<ReadStatus>("completed");

  const handleSubmit = () => {
    setIsPending(true);
    // do stuff
    setIsPending(false);
  };

  return (
    <Modal>
      <form className="flex flex-col gap-4">
        <h2>
          Add <span className="text-sky-500 font-medium">{bookData.title}</span>{" "}
          to your Library
        </h2>
        <StatusDropdown defaultValue={readStatus} setStatus={(status: ReadStatus) => setReadStatus(status)}/>
        {readStatus === "completed" &&  <RatingDropdown />}
        <div className="flex gap-2">
          <SubmitButton onClick={handleSubmit} isPending={isPending}>
            Confirm
          </SubmitButton>
          <CancelButton onClick={close} />
        </div>
      </form>
    </Modal>
  );
};

const RatingDropdown = () => {
  const ratingOptions = Array.from({ length: 10 }, (_, index) => index + 1);

  return (
    <div className="flex gap-2 items-center">
      <label htmlFor="status" className="flex gap-2 items-center">
        <FontAwesomeIcon icon={faStar} />
        Rating
      </label>
      <select
        id="status"
        className="p-2 rounded-md capitalize bg-slate-100"
        defaultValue={10}
      >
        {ratingOptions.map((rating, index) => (
          <option key={index} value={rating}>
            {rating}
          </option>
        ))}
      </select>
    </div>
  );
};

type StatusDropdownProps = {
  defaultValue: ReadStatus;
  setStatus: (status: ReadStatus) => void;
};

const StatusDropdown = ({
  defaultValue,
  setStatus,
}: StatusDropdownProps) => {
  const statusOptions = ["completed", "reading", "plan-to-read"];

  const handleChange: React.ChangeEventHandler<HTMLSelectElement> = (event) => {
    setStatus(event.target.value as ReadStatus)
  }

  return (
    <div className="flex gap-2 items-center">
      <label htmlFor="status" className="flex gap-2 items-center">
        <FontAwesomeIcon icon={faBarsProgress} />
        Status
      </label>
      <select
        id="status"
        className="p-2 rounded-md capitalize bg-slate-100"
        defaultValue={defaultValue}
        onChange={handleChange}
      >
        {statusOptions.map((status, index) => (
          <option key={index} value={status}>
            {status}
          </option>
        ))}
      </select>
    </div>
  );
};
