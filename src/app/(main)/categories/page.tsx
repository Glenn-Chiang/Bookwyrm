import { VolumeResult } from "@/components/VolumeResult";
import { VolumeData } from "@/lib/books-api/types";
import { getVolumesBySubject } from "./[categoryName]/page";

export default async function AllCategories() {
  const volumes = await getVolumesBySubject("classics", 0)
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
