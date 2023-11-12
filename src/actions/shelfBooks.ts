"use server";

import prisma from "@/lib/db";

export const addBookToShelf = async (shelfname: string, bookId: string) => {
  const userId = (await getCurrentUser()).id;

  const shelfBook = await prisma.shelfBook.create({
    data: {
      userId,
      shelfname,
      bookId,
    },
  });

  return shelfBook;
};

export const removeBookFromShelf = async (shelfname: string, bookId: string) => {
  const userId = (await getCurrentUser()).id;

  const shelfBook = await prisma.shelfBook.delete({
    where: {
      userId_shelfname_bookId: {
        userId, shelfname, bookId
      }
    }
  })

  return shelfBook
}


