import { getUserShelves } from "@/actions/shelves";
import { ShelfPreview } from "./components/ShelfPreview";
import { getCurrentUser } from "@/lib/auth";
import { CreateShelfButton } from "./components/CreateShelfButton";
import { getUser } from "@/actions/users";

export default async function Library({
  params,
}: {
  params: { userId: string };
}) {
  const userId = Number(params.userId);

  const currentUser = await getCurrentUser();
  const isOwner = currentUser?.id === userId;

  const shelves = await getUserShelves(userId);
  const owner = await getUser(userId);

  return (
    <main className="flex flex-col gap-8 w-full pt-8 px-4">
      <h1 className="text-center ">
        {isOwner ? (
          "Your"
        ) : (
          <span className="text-sky-500">{`${owner?.username}'s`}</span>
        )}{" "}
        Library
      </h1>
      {isOwner && <CreateShelfButton />}
      <ShelfPreview userId={userId} />
      {shelves.length ? (
        <ul className="flex flex-col gap-10">
          {shelves.map((shelf) => (
            <ShelfPreview
              key={shelf.shelfname}
              shelfname={shelf.shelfname}
              userId={userId}
            />
          ))}
        </ul>
      ) : (
        <p className="text-slate-500 text-center">
          {isOwner ? "You haven't" : `${owner?.username} hasn't`} created any
          shelves
        </p>
      )}
    </main>
  );
}
