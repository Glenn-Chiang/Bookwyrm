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
    <main className="flex flex-col items-center gap-4 w-full pt-8">
      <h1>Shelves</h1>
      <CreateShelfButton/>
      {shelves.length ? (
        shelves.map((shelf) => (
          <ShelfPreview
            key={shelf.shelfname}
            shelfname={shelf.shelfname}
            userId={userId}
          />
        ))
      ) : (
        <p className="text-slate-500">
          {IsOwnPage ? "You haven't" : "This user hasn't"} created any shelves
        </p>
      )}
    </main>
  );
}
