import prisma from "@/lib/db"

export const getUser = async (userId: number) => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId
    }
  })

  return user
}