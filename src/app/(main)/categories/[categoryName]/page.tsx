import { VolumeResult } from "@/components/VolumeResult";
import { VolumeData } from "@/lib/books-api/types";

export default async function CategoryPage({
  params,
}: {
  params: { categoryName: string };
}) {
  const category = params.categoryName;
  const volumes = await getVolumesBySubject(category);

  return (
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
        {volumes.map((volume) => (
          <VolumeResult
            key={volume.id}
            volumeId={volume.id}
            volumeInfo={volume}
          />
        ))}
      </ul>
  );
}

export const getVolumesBySubject = async (subject: string) => {
  const res = await fetch(
    `https://www.googleapis.com/books/v1/volumes?q=subject:${subject}&maxResults=${40}&key=${
      process.env.BOOKS_API_KEY
    }`
  );
  const volumeResults: VolumeData[] = (await res.json()).items;
  const volumes = volumeResults
    ? volumeResults.map((item) => {
        return { ...item.volumeInfo, id: item.id };
      })
    : [];
  return volumes;
};
