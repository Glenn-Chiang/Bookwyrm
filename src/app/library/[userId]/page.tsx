import { getUserShelves } from "@/actions/shelves";
import { ShelfPreview } from "./components/ShelfPreview";
import { getCurrentUser } from "@/lib/auth";
import { CreateShelfButton } from './components/CreateShelfButton';

export default async function Library({
  params,
}: {
  params: { userId: string };
}) {
  const userId = Number(params.userId);

  const currentUser = await getCurrentUser();
  const IsOwnPage = currentUser.id === userId;

  const shelves = await getUserShelves(userId);

  return (
    <main className="flex flex-col gap-8 w-full pt-8">
      <h1 className="text-center text-3xl">Library</h1>
      <CreateShelfButton />
      <ShelfPreview userId={userId}/>
      {shelves.length ? (
        <ul className="flex flex-col gap-10">
          {shelves.map((shelf) => (
            <ShelfPreview key={shelf.shelfname} shelfname={shelf.shelfname} userId={userId}/>
          ))}
        </ul>
      ) : (
        <p className="text-slate-500 text-center">
          {IsOwnPage ? "You haven't" : "This user hasn't"} created any shelves
        </p>
      )}
    </main>
  );
}
