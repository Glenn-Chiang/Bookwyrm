import { VolumeData, VolumeInfo } from "@/lib/books-api/types";
import { VolumeResult } from "./VolumeResult";

type SearchResultsProps = {
  searchTerm: string | undefined;
};

const getVolumes = async (searchTerm: string) => {
  const queryString = searchTerm?.split(" ").join("+");
  const res = await fetch(
    `https://www.googleapis.com/books/v1/volumes?q=${queryString}&maxResults=${40}&key=${
      process.env.BOOKS_API_KEY
    }`
  );
  const volumeResults: VolumeData[] = (await res.json()).items;
  const volumes = volumeResults.map((item) => {
    return { ...item.volumeInfo, id: item.id };
  });
  return volumes;
};

export const SearchResults = async ({ searchTerm }: SearchResultsProps) => {
  const volumes = searchTerm ? await getVolumes(searchTerm) : [];

  return (
    <section className="flex flex-col gap-4 w-full sm:w-4/5">
      {volumes.map((volume) => (
        <VolumeResult key={volume.id} volumeId={volume.id} volumeInfo={volume}/>
      ))}
    </section>
  );
};
