import { VolumeData, VolumeInfo } from "@/lib/books-api/types";
import { BookResult } from "./BookResult";

type SearchResultsProps = {
  searchTerm: string | undefined;
};

const getBooksData = async (searchTerm: string) => {
  const queryString = searchTerm?.split(" ").join("+");
  const res = await fetch(
    `https://www.googleapis.com/books/v1/volumes?q=${queryString}&key=${process.env.BOOKS_API_KEY}`
  );
  const volumeResults: VolumeData[] = (await res.json()).items;
  const books: VolumeInfo[] = volumeResults.map((item) => {
    return { ...item.volumeInfo, id: item.id };
  });
  return books;
};

export const SearchResults = async ({ searchTerm }: SearchResultsProps) => {
  const books = searchTerm ? await getBooksData(searchTerm) : [];

  return (
    <section className="flex flex-col gap-4">
      {books.map((book) => (
        <BookResult key={book.id} book={book} />
      ))}
    </section>
  );
};
