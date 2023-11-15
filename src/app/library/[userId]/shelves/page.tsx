import { getShelves } from "@/actions/shelves";
import { ShelfPreview } from "./components/ShelfPreview";
import { getCurrentUser } from "@/lib/auth";
import { CreateShelfButton } from "./components/CreateShelfButton";

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
    <main className="flex flex-col gap-8 w-full pt-8">
      <h1 className="text-center">Shelves</h1>
      <CreateShelfButton />
      {shelves.length ? (
        <ul className="flex flex-col gap-8">
          {shelves.map((shelf) => (
            <ShelfPreview
              key={shelf.shelfname}
              shelf={shelf}
            />
          ))}
        </ul>
      ) : (
        <p className="text-slate-500">
          {IsOwnPage ? "You haven't" : "This user hasn't"} created any shelves
        </p>
      )}
    </main>
  );
}
