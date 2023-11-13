"use server";

import prisma from "@/lib/db";
import { ReadStatus, BookData } from "@/lib/types";
import { getCurrentUser } from "@/lib/auth";
import { revalidatePath } from "next/cache";

// Get books in user's library with given status. If status is not specified, get all books in user's library.
export const getUserBooks = async (userId: number) => {
  const userBooks = await prisma.userBook.findMany({
    where: {
      userId,
    },
    include: {
      book: true,
    },
  });
  return userBooks
};

export const getUserBook = async (bookId: string) => {
  const userId = (await getCurrentUser()).id;

  const userBook = await prisma.userBook.findUnique({
    where: {
      userId_bookId: {
        userId, bookId
      }
    }
  })
  return userBook
}

// Add book to user's library. A user can only have 1 entry of each book in their library
export const addBookToUser = async (
  bookData: BookData,
  status: ReadStatus,
  rating: number | null
) => {
  // If status is not "completed", rating must be undefined
  if (status !== 'completed' && rating) {
    throw new Error("Only books with 'completed' status can have a rating")
  }

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

  revalidatePath('/')
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

  revalidatePath("/");
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

  revalidatePath("/");
  return userBook;
};

export const updateBookRating = async (bookId: string, rating: number | null) => {
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

  revalidatePath("/");
  return userBook;
};
