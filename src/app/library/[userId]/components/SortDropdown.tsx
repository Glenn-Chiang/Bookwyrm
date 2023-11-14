"use client";

import { createQueryString } from "@/lib/helpers/createQueryString";
import { faSortAmountDesc } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

export const SortDropdown = () => {
  const sortOptions = ["recent", "status", "author", "title", "rating"];

  const router = useRouter();
  const searchParams = useSearchParams();

  const handleChange: React.ChangeEventHandler<HTMLSelectElement> = (event) => {
    const sortParam = event.target.value;
    const queryString = createQueryString(searchParams, "sort", sortParam);
    router.push("?" + queryString);
  };

  return (
    <div className="flex gap-4 items-center p-4 w-full">
      <label htmlFor="sort" className="flex gap-2 items-center">
        <FontAwesomeIcon icon={faSortAmountDesc} />
        Sort by
      </label>
      <select
        value={searchParams.get('sort') || 'recent'}
        id="sort"
        className="p-2 rounded-md capitalize bg-slate-100"
        onChange={handleChange}
      >
        {sortOptions.map((sortOption, index) => (
          <option key={index} value={sortOption}>
            {sortOption}
          </option>
        ))}
      </select>
    </div>
  );
};
