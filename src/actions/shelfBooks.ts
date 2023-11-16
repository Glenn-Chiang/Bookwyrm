"use server";

import prisma from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export const getShelfBooks = async (userId: number, shelfname: string) => {
  const shelfBooks = await prisma.shelfBook.findMany({
    where: {
      userId,
      shelfname,
    },
    include: {
      userBook: {
        include: {
          book: true,
          shelves: true,
        },
      },
    },
    orderBy: {
      dateAdded: "desc",
    },
  });
  return shelfBooks;
};

// Given a list of shelves that this book should be in, compare this given list with the current shelves the book is already in. Perform the necessary addition/removal of this book from shelves to emulate the given list.
export const setBookShelves = async (bookId: string, shelfnames: string[]) => {
  const userId = (await getCurrentUser()).id;

  // Add this book to any shelves in the given list that it is not currently in
  for (const shelfname of shelfnames) {
    // TODO: Check if shelfname exists
    await prisma.shelfBook.upsert({
      where: {
        userId_shelfname_bookId: {
          userId,
          shelfname,
          bookId,
        },
      },
      update: {},
      create: { userId, shelfname, bookId },
    });
  }

  // Remove this book from any shelves it is currently in that are not in the given list
  await prisma.shelfBook.deleteMany({
    where: {
      userId,
      bookId,
      shelfname: {
        notIn: shelfnames,
      },
    },
  });

  revalidatePath("/");
};

// Add multiple books to shelf by bookId
export const addBooksToShelf = async (shelfname: string, bookIds: string[]) => {
  const userId = (await getCurrentUser()).id;

  const booksToAdd = bookIds.map((bookId) => {
    return {
      userId,
      shelfname,
      bookId,
    };
  });

  const shelfBooks = await prisma.shelfBook.createMany({
    data: booksToAdd,
    skipDuplicates: true,
  });

  revalidatePath('/')
  return shelfBooks
};

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

export const removeBookFromShelf = async (
  shelfname: string,
  bookId: string
) => {
  const userId = (await getCurrentUser()).id;

  const shelfBook = await prisma.shelfBook.delete({
    where: {
      userId_shelfname_bookId: {
        userId,
        shelfname,
        bookId,
      },
    },
  });

  revalidatePath('/')
  return shelfBook;
};
