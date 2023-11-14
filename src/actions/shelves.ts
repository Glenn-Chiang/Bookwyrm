"use server";

import prisma from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";

export const getShelves = async (userId: number) => {
  const shelves = await prisma.shelf.findMany({
    where: {
      creatorId: userId
    },
    include: {
      books: {
        include: {
          book: {
            include: {
              book: true
            }
          }
        }
      }
    }
  })
  return shelves
}

export const createShelf = async (shelfname: string) => {
  const userId = (await getCurrentUser()).id;

  const shelf = await prisma.shelf.create({
    data: {
      creatorId: userId,
      shelfname,
    },
  });

  return shelf;
};

export const deleteShelf = async (shelfname: string) => {
  const userId = (await getCurrentUser()).id;

  const shelf = await prisma.shelf.delete({
    where: {
      creatorId_shelfname: {
        creatorId: userId,
        shelfname,
      },
    },
  });

  return shelf;
};

export const renameShelf = async (shelfname: string) => {
  const userId = (await getCurrentUser()).id;

  const shelf = await prisma.shelf.update({
    where: {
      creatorId_shelfname: {
        creatorId: userId,
        shelfname,
      },
    },
    data: {
      shelfname,
    },
  });

  return shelf
};
