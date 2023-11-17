"use client";

import { ReadStatus } from "@/lib/types";
import { faBarsProgress } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type StatusDropdownProps = {
  defaultValue: ReadStatus;
  handleChange: (status: ReadStatus) => void;
  readOnly?: boolean
};

export const StatusDropdown = ({
  defaultValue,
  handleChange,
  readOnly
}: StatusDropdownProps) => {

  const statusOptions = [
    {
      value: "completed",
      style: "bg-teal-100 text-teal-500"
    },
    {
      value: "reading",
      style: "bg-sky-100 text-sky-500"
    },
    {
      value: "plan-to-read",
      style: "bg-amber-100 text-amber-500"
    }
  ]
  const style = statusOptions.find(option => option.value === defaultValue)?.style

  const onChange: React.ChangeEventHandler<HTMLSelectElement> = (event) => {
    handleChange(event.target.value as ReadStatus);
  };

  return (
    <div className="flex gap-2 items-center">
      <label className="flex gap-2 items-center">
        <FontAwesomeIcon icon={faBarsProgress} />
        Status
      </label>
      {readOnly ? (
        <span className={`p-2 rounded-md capitalize bg-slate-100 ${style}`}>
          {defaultValue}
        </span>
      ) : (
        <select
          className={`p-2 rounded-md capitalize bg-slate-100 ${style}`}
          defaultValue={defaultValue}
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
      )}
    </div>
  );
};

