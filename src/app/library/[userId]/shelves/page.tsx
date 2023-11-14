import { getShelves } from "@/actions/shelves";
import { ShelfPreview } from "./components/ShelfPreview";
import { getCurrentUser } from "@/lib/auth";

export default async function Shelves({
  params,
}: {
  params: { userId: string };
}) {
  const userId = Number(params.userId);

  const currentUser = await getCurrentUser();
  const IsOwnPage = currentUser.id === userId;

  const shelves = await getShelves(userId);

  return (
    <main className="flex flex-col items-center gap-2 w-full pt-8">
      <h1>Shelves</h1>
      {shelves.length ? (
        shelves.map((shelf) => <ShelfPreview key={shelf.shelfname} />)
      ) : (
        <p className="text-slate-500">
          {IsOwnPage ? "You haven't" : "This user hasn't"} created any shelves
        </p>
      )}
    </main>
  );
}
