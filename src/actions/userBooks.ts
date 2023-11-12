"use server";

import prisma from "@/lib/db";
import { ReadStatus, UserBookData } from "@/lib/types";

// Add book to user's library. A user can only have 1 entry of each book in their library.
export const addBookToUser = async (bookData: UserBookData) => {
  const userId = (await getCurrentUser()).id;

  const { id: bookId, title, authors, thumbnail, status, rating } = bookData;

  const userBook = await prisma.userBook.create({
    data: {
      userId,
      bookId,
      title,
      authors,
      thumbnail,
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

