"use client";

import { ReadStatus } from "@/lib/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBarsProgress } from "@fortawesome/free-solid-svg-icons";
import { useState } from 'react';

type StatusDropdownProps = {
  defaultValue: ReadStatus;
  handleChange: (status: ReadStatus) => void;
};

export const StatusDropdown = ({
  defaultValue,
  handleChange,
}: StatusDropdownProps) => {

  const statusOptions = [
    {
      value: "completed",
      style: "bg-teal-100 text-teal-500"
    },
    {
      value: "reading",
      style: "bg-sky-50 text-sky-500"
    },
    {
      value: "plan-to-read",
      style: "bg-amber-50 text-amber-500"
    }
  ]
  const [status, setStatus] = useState(defaultValue)
  const style = statusOptions.find(option => option.value === status)?.style

  const onChange: React.ChangeEventHandler<HTMLSelectElement> = (event) => {
    handleChange(event.target.value as ReadStatus);
    setStatus(event.target.value as ReadStatus)
  };

  return (
    <div className="flex gap-2 items-center">
      <label htmlFor="status" className="flex gap-2 items-center">
        <FontAwesomeIcon icon={faBarsProgress} />
        Status
      </label>
      <select
        id="status"
        className={`p-2 rounded-md capitalize bg-slate-100 ${style}`}
        value={status}
        onChange={onChange}
      >
        {statusOptions.map((status, index) => (
          <option
            key={index}
            value={status.value}
            className={statusOptions[index].style}
          >
            {status.value}
          </option>
        ))}
      </select>
    </div>
  );
};
