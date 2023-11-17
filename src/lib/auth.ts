import { useSession } from "next-auth/react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

// Get current user on client-side
export const useCurrentUser = () => {
  const session = useSession();
  const user = session.data?.user;
  if (!user) return null
  return { id: user.id };
};

// Get current user on server-side
export const getCurrentUser = async () => {
  const session = await getServerSession(authOptions)
  const user = session?.user
  if (!user) return null
  return {id: user.id};
};
