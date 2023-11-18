import { getUsers } from "@/actions/users";
import { UserDetail } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";

export default async function Community() {
  const users = await getUsers();

  return (
    <>
      <h1>Community</h1>
      <ul className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full py-4">
        {users.map((user) => (
          <UserLink key={user.id} user={user} />
        ))}
      </ul>
    </>
  );
}

type UserLinkProps = {
  user: UserDetail;
};

const UserLink = ({ user }: UserLinkProps) => {
  return (
    <Link href={`/library/${user.id}`} className="flex gap-2 items-center hover:bg-slate-100 rounded-md p-2 w-full">
      {user.avatarUrl && (
        <Image
          src={user.avatarUrl}
          alt=""
          width={40}
          height={40}
          className="rounded-full"
        />
      )}
      <div className="flex flex-col">
        <span>{user.username}</span>
        <span className="text-slate-500">{user._count.books} books</span>
      </div>
    </Link>
  );
};
