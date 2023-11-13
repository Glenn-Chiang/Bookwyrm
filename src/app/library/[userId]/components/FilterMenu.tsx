"use client";

import { statusOptions } from "@/lib/constants";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export const FilterMenu = () => {
  const filterLabels = ["all"].concat(statusOptions);

  return (
    <section className="p-4 capitalize flex gap-2">
      {filterLabels.map((label, index) => (
        <FilterTab key={index} filterLabel={label} />
      ))}
    </section>
  );
};

type FilterTabProps = {
  filterLabel: string;
};

const FilterTab = ({ filterLabel }: FilterTabProps) => {
  const searchParams = useSearchParams();
  const currentFilter = searchParams.get("status");

  // check if this filter is currently selected
  // if no filter is specified in query param, show 'all' as selected by default
  const isActive = currentFilter
    ? currentFilter === filterLabel
    : filterLabel === "all";

  return (
    <Link
      href={`?status=${filterLabel}`}
      className={` rounded-full p-2 ${
        isActive ? "bg-sky-100 text-sky-500" : ""
      }`}
    >
      {filterLabel}
    </Link>
  );
};
