import prisma from "@/lib/db"

export const getUser = async (userId: number) => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId
    }
  })

  return user
}

export const getUsers = async () => {
  const users = await prisma.user.findMany({
    include: {
      _count: {
        select: {
          books: true
        }
      }
    }
  })
  return users
}