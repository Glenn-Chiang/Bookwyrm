import { SearchResults } from "@/components/SearchResults";
import { Searchbar } from "@/components/Searchbar";
import { faBookOpenReader } from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"

export default function Home({searchParams}: {searchParams: { [key: string]: string | string[] | undefined }}) {
  return (
    <>
      <h1 className="text-4xl text-sky-500 font-medium p-10 flex flex-col gap-2 items-center">
        <FontAwesomeIcon icon={faBookOpenReader}/>
        Bookwyrm
      </h1>
      <section className="flex flex-col w-full sm:w-4/5 p-4">
        <h2>Search for a book</h2>
        <Searchbar/>
      </section>
      <SearchResults searchTerm={searchParams.search as string | undefined}/>
    </>
  )
}
