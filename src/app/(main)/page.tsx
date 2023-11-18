import { Logo } from "@/components/Logo";
import { SearchResults } from "@/components/SearchResults";
import { Searchbar } from "@/components/Searchbar";

export default function Home({searchParams}: {searchParams: { [key: string]: string | string[] | undefined }}) {
  return (
    <>
      <h1 className="text-4xl text-sky-500 font-medium p-10 flex flex-col gap-2 items-center">
        <Logo size="large"/>
        Bookwyrm
      </h1>
      <section className="flex flex-col w-full sm:w-4/5 p-4">
        <Searchbar/>
      </section>
      <SearchResults searchTerm={searchParams.search as string | undefined}/>
    </>
  )
}
