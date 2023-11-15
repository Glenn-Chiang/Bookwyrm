"use server";

import prisma from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export const getUserShelves = async (userId: number) => {
  const shelves = await prisma.shelf.findMany({
    where: {
      creatorId: userId,
    },
    include: {
      _count: {
        select: {
          shelfBooks: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return shelves;
};

export const getUserShelf = async (userId: number, shelfname: string) => {
  const shelf = await prisma.shelf.findUnique({
    where: {
      creatorId_shelfname: {
        creatorId: userId,
        shelfname,
      },
    },
    include: {
      _count: {
        select: {
          shelfBooks: true,
        },
      },
    },
  });
  return shelf;
};

export const createShelf = async (shelfname: string) => {
  const userId = (await getCurrentUser()).id;
  // TODO: Handle duplicate shelfnames
  const shelf = await prisma.shelf.create({
    data: {
      creatorId: userId,
      shelfname: shelfname.toLowerCase(),
    },
  });

  revalidatePath("/");
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

  revalidatePath("/");
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

  revalidatePath("/");
  return shelf;
};
