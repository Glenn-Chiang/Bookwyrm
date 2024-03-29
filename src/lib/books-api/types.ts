// Raw data returned from google-books-api
export type VolumeInfo = {
  title: string;
  subtitle: string;
  authors?: string[];
  publisher: string;
  publishedDate: string;
  description: string;
  industryIdentifiers: [
    {
      type: string;
      identifier: string;
    }
  ];
  pageCount: number;
  dimensions: {
    height: string;
    width: string;
    thickness: string;
  };
  printType: string;
  mainCategory: string;
  categories: string[];
  averageRating: number;
  ratingsCount: number;
  contentVersion: string;
  imageLinks?: {
    smallThumbnail: string;
    thumbnail: string;
    small: string;
    medium: string;
    large: string;
    extraLarge: string;
  };
  language: string;
  previewLink: string;
  infoLink: string;
  canonicalVolumeLink: string;
};

export type VolumeData = {
  kind: "books#volume";
  id: string;
  etag: string;
  selfLink: string;
  volumeInfo: VolumeInfo;
};
