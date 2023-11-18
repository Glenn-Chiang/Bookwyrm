import { Prisma } from "@prisma/client";

export type ReadStatus = "completed" | "reading" | "plan-to-read";

export type BookData = {
  id: string;
  title: string;
  authors?: string[];
  thumbnail?: string;
};

const userBookDetail = Prisma.validator<Prisma.UserBookDefaultArgs>()({
  include: {
    book: true,
    shelves: true,
  },
});

const userDetail = Prisma.validator<Prisma.UserDefaultArgs>()({
  include: {
    _count: {
      select: {
        books: true,
      },
    },
  },
});

export type UserBookDetail = Prisma.UserBookGetPayload<typeof userBookDetail>;
export type UserDetail = Prisma.UserGetPayload<typeof userDetail>