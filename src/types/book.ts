export interface Book {
  id: string;
  slug: string;
  title: string;
  author: string;
  genre: string;
  rating: number;
  readDate: string;
  coverUrl: string;
  status: "완독" | "읽는중" | "읽고싶음";
  oneLineSummary: string;
  quote?: string;
}

export interface BookDetail extends Book {
  content: string;
}
