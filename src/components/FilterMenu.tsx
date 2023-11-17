"use client";

import { statusOptions } from "@/lib/constants";
import { createQueryString } from "@/lib/helpers/createQueryString";
import {
  IconDefinition,
  faBook,
  faBookOpen,
  faCalendar,
  faCalendarCheck,
  faCheckCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

type Label = {
  text: string;
  icon?: IconDefinition;
};

export const FilterMenu = () => {
  const filterLabels: Label[] = [
    {
      text: "all",
    },
    {
      text: "completed",
      icon: faBook,
    },
    {
      text: "reading",
      icon: faBookOpen,
    },
    {
      text: "plan-to-read",
      icon: faCalendarCheck,
    },
  ];

  return (
    <nav className="shadow sticky top-16 z-20 bg-white w-screen p-2 capitalize flex gap-2 overflow-x-scroll sm:overflow-auto justify-between sm:justify-center items-center">
      {filterLabels.map((filter, index) => (
        <FilterTab key={index} filterLabel={filter} />
      ))}
    </nav>
  );
};

type FilterTabProps = {
  filterLabel: Label;
};

const FilterTab = ({ filterLabel }: FilterTabProps) => {
  const searchParams = useSearchParams();
  const currentFilter = searchParams.get("status");

  // check if this filter is currently selected
  // if no filter is specified in query param, show 'all' as selected by default
  const isActive = currentFilter
    ? currentFilter === filterLabel.text
    : filterLabel.text === "all";  

  return (
    <Link
      href={'?' + createQueryString(searchParams, 'status', filterLabel.text)}
      className={`min-w-max rounded-full p-2 flex gap-2 items-center ${
        isActive && "bg-sky-100 text-sky-500" 
      }`}
    >
      {filterLabel.icon && <FontAwesomeIcon icon={filterLabel.icon} />}
      {filterLabel.text}
    </Link>
  );
};
