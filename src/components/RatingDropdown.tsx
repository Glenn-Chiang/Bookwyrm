"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

type RatingDropdown = {
  defaultValue: number | null;
  handleChange: (rating: number | null) => void;
  readOnly?: boolean;
};

export const RatingDropdown = ({
  defaultValue,
  handleChange,
  readOnly,
}: RatingDropdown) => {
  const ratingOptions = [
    ...Array.from({ length: 10 }, (_, index) => index + 1),
    "-",
  ];

  const onChange: React.ChangeEventHandler<HTMLSelectElement> = (event) => {
    const selectedOption = event.target.value;
    handleChange(selectedOption === "-" ? null : Number(selectedOption));
  };

  return (
    <div className="flex gap-2 items-center">
      <label className="flex gap-2 items-center">
        <FontAwesomeIcon icon={faStar} />
        Rating
      </label>
      {readOnly ? (
        <span className="py-2 px-4 rounded-md capitalize bg-slate-100">
          {defaultValue || "-"}
        </span>
      ) : (
        <select
          className="p-2 rounded-md capitalize bg-slate-100"
          defaultValue={defaultValue || "-"}
          // value={defaultValue || '-'}
          onChange={onChange}
        >
          {ratingOptions.map((rating) => (
            <option key={rating} value={rating}>
              {rating}
            </option>
          ))}
        </select>
      )}
    </div>
  );
};
