import { getTranslations, setRequestLocale } from "next-intl/server";
import { getBooks } from "@/lib/notion";
import { BookCard } from "@/components/BookCard";
import { GenreFilterWrapper } from "@/components/GenreFilterWrapper";
import { ReadingGoal } from "@/components/ReadingGoal";
import type { Book } from "@/types/book";

export const revalidate = 60;

export default async function HomePage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ genre?: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const { genre } = await searchParams;
  const t = await getTranslations("home");

  let books: Book[] = [];
  try {
    books = await getBooks({ sort: "readDate_desc" });
  } catch {
    books = [];
  }

  const currentYear = new Date().getFullYear().toString();
  const yearlyCount = books.filter((b) =>
    b.readDate?.startsWith(currentYear),
  ).length;
  const genres = [
    ...new Set(books.map((b) => b.genre).filter(Boolean)),
  ] as string[];
  const filtered = genre ? books.filter((b) => b.genre === genre) : books;

  return (
    <div className="container mx-auto max-w-6xl px-4 py-12">
      {/* 연간 독서량 */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{t("recentBooks")}</h1>
        <p className="text-muted-foreground">
          {t("yearlyCount", { count: yearlyCount })}
        </p>
        <div className="mt-3">
          <ReadingGoal currentCount={yearlyCount} locale={locale} />
        </div>
      </div>

      {/* 장르 필터 */}
      <div className="mb-8">
        <GenreFilterWrapper genres={genres} selected={genre ?? ""} />
      </div>

      {/* 책 목록 */}
      {filtered.length === 0 ? (
        <p className="text-muted-foreground text-center py-16">
          {t("noBooks")}
        </p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      )}
    </div>
  );
}
