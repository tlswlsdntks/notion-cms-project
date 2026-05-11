import { Suspense } from "react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { getBooks } from "@/lib/notion";
import { BookCard } from "@/components/BookCard";
import { GenreFilterWrapper } from "@/components/GenreFilterWrapper";
import { SortFilterWrapper } from "@/components/SortFilterWrapper";
import { SearchInput } from "@/components/SearchInput";
import type { Book } from "@/types/book";

export const revalidate = 60;

export const metadata = {
  title: "책 목록 | 북 리뷰",
  description: "완독한 책 목록과 리뷰",
};

export default async function BooksPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{
    genre?: string;
    minRating?: string;
    sort?: string;
    q?: string;
  }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const { genre, minRating, sort, q } = await searchParams;
  const t = await getTranslations("books");

  let books: Book[] = [];
  let allBooks: Book[] = [];
  try {
    [books, allBooks] = await Promise.all([
      getBooks({
        genre: genre || undefined,
        minRating: minRating ? Number(minRating) : undefined,
        sort: (sort as "readDate_desc" | "rating_desc") || "readDate_desc",
        search: q || undefined,
      }),
      getBooks(),
    ]);
  } catch {
    books = [];
    allBooks = [];
  }

  const genres = [
    ...new Set(allBooks.map((b) => b.genre).filter(Boolean)),
  ] as string[];

  return (
    <div className="container mx-auto max-w-6xl px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">{t("title")}</h1>

      {/* 검색 */}
      <div className="mb-4">
        <Suspense
          fallback={
            <div className="h-10 w-full max-w-sm bg-muted animate-pulse rounded-md" />
          }
        >
          <SearchInput />
        </Suspense>
      </div>

      {/* 필터/정렬 */}
      <div className="flex flex-wrap gap-4 mb-8">
        <GenreFilterWrapper genres={genres} selected={genre ?? ""} />
        <SortFilterWrapper
          sort={sort ?? "readDate_desc"}
          minRating={minRating ?? ""}
        />
      </div>

      {/* 책 목록 */}
      {books.length === 0 ? (
        <p className="text-muted-foreground text-center py-16">
          {q ? t("noResults") : t("noBooks")}
        </p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {books.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      )}
    </div>
  );
}
