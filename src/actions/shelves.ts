"use server";

import prisma from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export const getShelves = async (userId: number) => {
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
  });
  return shelves;
};

export const createShelf = async (shelfname: string) => {
  const userId = (await getCurrentUser()).id;

  const shelf = await prisma.shelf.create({
    data: {
      creatorId: userId,
      shelfname,
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
