"use client"

import { ReadStatus } from "@/lib/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBarsProgress } from "@fortawesome/free-solid-svg-icons";

type StatusDropdownProps = {
  defaultValue: ReadStatus;
  handleChange: (status: ReadStatus) => void;
};

export const StatusDropdown = ({ defaultValue, handleChange }: StatusDropdownProps) => {
  const statusOptions = ["completed", "reading", "plan-to-read"];

  const onChange: React.ChangeEventHandler<HTMLSelectElement> = (event) => {
    handleChange(event.target.value as ReadStatus);
  };

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
        onChange={onChange}
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
