import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

type RatingDropdown = {
  defaultValue: number;
  handleChange: (rating: number) => void
}

export const RatingDropdown = ({defaultValue, handleChange}: RatingDropdown) => {
  const ratingOptions = Array.from({ length: 10 }, (_, index) => index + 1);

  const onChange: React.ChangeEventHandler<HTMLSelectElement> = (event) => {
    handleChange(Number(event.target.value))
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
        defaultValue={defaultValue}
        onChange={onChange}
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
