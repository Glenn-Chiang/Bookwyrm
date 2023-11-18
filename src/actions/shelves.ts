"use server";

import prisma from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { Prisma } from "@prisma/client";

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
  const userId = (await getCurrentUser())?.id;

  try {
    const shelf = await prisma.shelf.create({
      data: {
        creatorId: userId,
        shelfname,
      },
    });
    revalidatePath("/");
    return { status: "success", message: `Shelf ${shelfname} created` };
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return {
        status: "error",
        message:
          "You already have a shelf with this name. Shelfnames must be unique.",
      };
    }
    return { status: "error", message: (error as Error).message };
  }
};

export const deleteShelf = async (shelfname: string) => {
  const userId = (await getCurrentUser())?.id;

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

export const renameShelf = async (currentName: string, newName: string) => {
  const userId = (await getCurrentUser())?.id;

  const shelf = await prisma.shelf.update({
    where: {
      creatorId_shelfname: {
        creatorId: userId,
        shelfname: currentName,
      },
    },
    data: {
      shelfname: newName,
    },
  });

  revalidatePath("/");
  return shelf;
};
