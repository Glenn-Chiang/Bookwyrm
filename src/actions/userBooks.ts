"use server";

import prisma from "@/lib/db";
import { ReadStatus, BookData } from "@/lib/types";

// Get books in user's library with given status. If status is not specified, get all books in user's library.
export const getUserBooks = async (userId: string) => {
  const books = await prisma.userBook.findMany({});
};

// Add book to user's library. A user can only have 1 entry of each book in their library.
export const addBookToUser = async (
  bookData: BookData,
  status: ReadStatus,
  rating: number
) => {
  const { id: bookId, title, authors, thumbnail } = bookData;
  const userId = (await getCurrentUser()).id;

  // Create entry for book if no user has added this book before
  await prisma.book.upsert({
    where: {
      id: bookId,
    },
    update: {},
    create: { id: bookId, title, authors, thumbnail },
  });

  const userBook = await prisma.userBook.create({
    data: {
      userId,
      bookId,
      status,
      rating,
    },
  });

  return userBook;
};

// Remove book from user's library. The book will be removed from all the user's shelves.
export const removeBookFromUser = async (bookId: string) => {
  const userId = (await getCurrentUser()).id;

  const userBook = await prisma.userBook.delete({
    where: {
      userId_bookId: {
        userId,
        bookId,
      },
    },
  });

  return userBook;
};

// Mark as 'completed', 'reading' or 'plan-to-read'
export const updateBookStatus = async (bookId: string, status: ReadStatus) => {
  const userId = (await getCurrentUser()).id;

  const userBook = await prisma.userBook.update({
    where: {
      userId_bookId: {
        userId,
        bookId,
      },
    },
    data: {
      status,
    },
  });

  return userBook;
};

export const updateBookRating = async (bookId: string, rating: number) => {
  const userId = (await getCurrentUser()).id;

  const userBook = await prisma.userBook.update({
    where: {
      userId_bookId: {
        userId,
        bookId,
      },
    },
    data: {
      rating,
    },
  });

  return userBook;
};
