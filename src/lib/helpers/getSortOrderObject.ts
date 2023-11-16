type UserBooksSortOrder =
  | { book: { title: "asc" } }
  | { book: { authors: "asc" } }
  | { rating: { sort: "desc"; nulls: "last" } }
  | { dateAdded: "desc" }
  | { status: "desc" };

type ShelfBooksSortOrder =
  | { userBook: { book: { title: "asc" } } }
  | { userBook: { book: { authors: "asc" } } }
  | { userBook: { rating: { sort: "desc"; nulls: "last" } } }
  | { dateAdded: "desc" } // Date added to shelf, not library
  | { userBook: { status: "desc" } }

export const getShelfBooksSortOrderObject = (
  sortOrder?: string | string[]
): ShelfBooksSortOrder => {
  let orderBy: ShelfBooksSortOrder;

  switch (sortOrder) {
    case "title":
      orderBy = { userBook: { book: { title: "asc" } } };
      break;
    case "author":
      orderBy = { userBook: { book: { authors: "asc" } } };
      break;
    case "rating":
      orderBy = { userBook: { rating: { sort: "desc", nulls: "last" } } };
      break
    case 'status':
      orderBy = { userBook: { status: "desc" } };
      break
    case 'recent':
      orderBy = { dateAdded: "desc" }; 
      break
    default:
      orderBy = { dateAdded: "desc" }; 
  }

  return orderBy
};

export const getUserBooksSortOrderObject = (
  sortOrder?: string | string[]
): UserBooksSortOrder => {
  let orderBy: UserBooksSortOrder;

  switch (sortOrder) {
    case "title":
      orderBy = { book: { title: "asc" } };
      break;
    case "author":
      orderBy = { book: { authors: "asc" } };
      break;
    case "rating":
      orderBy = { rating: { sort: "desc", nulls: "last" } };
      break;
    case "status":
      orderBy = { status: "desc" };
      break;
    case "recent":
      orderBy = { dateAdded: "desc" };
      break;
    default:
      orderBy = { dateAdded: "desc" };
  }

  return orderBy;
};
