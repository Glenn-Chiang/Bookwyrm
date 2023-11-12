"use server";

import prisma from "@/lib/db";

export const getShelfBooks = async (userId: number, shelfname: string) => {
  const shelfBooks = await prisma.shelfBook.findMany({
    where: {
      userId, shelfname
    },
    include: {
      book: {
        include: {
          book: true
        }
      }
    }
  })  
  return shelfBooks
}

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


