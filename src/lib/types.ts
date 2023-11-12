export type ReadStatus = "completed" | "reading" | "plan-to-read";

export type BookData = {
  id: string;
  title: string;
  authors: string[];
  thumbnail?: string;

  status: ReadStatus;
  rating?: number;
};
