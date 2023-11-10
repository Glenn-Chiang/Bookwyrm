import { VolumeData, VolumeInfo } from "@/lib/books-api/types";

type SearchResultsProps = {
  searchTerm: string | undefined
}

const getBooks = async (searchTerm: string) => {
  const queryString = searchTerm?.split(' ').join('+')
  const res = await fetch(
    `https://www.googleapis.com/books/v1/volumes?q=${queryString}&key=${process.env.BOOKS_API_KEY}`
  );
  const volumesData: VolumeData[] = (await res.json()).items
  const books: VolumeInfo[] = volumesData.map(item => item.volumeInfo)
  console.log(books)
}

export const SearchResults = async ({searchTerm}: SearchResultsProps) => {
  const books = searchTerm ? await getBooks(searchTerm) : []

  return (
    <section>

    </section>
  )
};