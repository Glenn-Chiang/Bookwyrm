"use client"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

type RatingDropdown = {
  defaultValue: number | null;
  handleChange: (rating: number | null) => void
}

export const RatingDropdown = ({defaultValue, handleChange}: RatingDropdown) => {
  const ratingOptions = [...Array.from({ length: 10 }, (_, index) => index + 1), '-']

  const onChange: React.ChangeEventHandler<HTMLSelectElement> = (event) => {
    const selectedOption = event.target.value
    handleChange(selectedOption === '-' ? null : Number(selectedOption))
  }

  return (
    <div className="flex gap-2 items-center">
      <label htmlFor="status" className="flex gap-2 items-center">
        <FontAwesomeIcon icon={faStar} />
        Rating
      </label>
      <select
        id="status"
        className="p-2 rounded-md capitalize bg-slate-100"
        value={defaultValue || '-'}
        onChange={onChange}
      >
        {ratingOptions.map(rating => (
          <option key={rating} value={rating}>
            {rating}
          </option>
        ))}
      </select>
    </div>
  );
};
