import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/navigation";
import { getBooks } from "@/lib/notion";
import type { Book } from "@/types/book";

export const revalidate = 60;

export default async function QuotesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "quotes" });

  let books: Book[] = [];
  try {
    books = await getBooks();
  } catch {
    books = [];
  }

  const booksWithQuotes = books.filter((b) => b.quote);

  return (
    <main className="container mx-auto max-w-4xl px-4 py-12 space-y-6">
      <h1 className="text-3xl font-bold">{t("title")}</h1>
      {booksWithQuotes.length === 0 ? (
        <p className="text-muted-foreground">{t("empty")}</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {booksWithQuotes.map((book) => (
            <Link
              key={book.id}
              href={{ pathname: "/books/[slug]", params: { slug: book.slug } }}
            >
              <div className="border rounded-lg p-5 space-y-3 hover:border-foreground/30 transition-colors h-full">
                <blockquote className="text-sm leading-relaxed italic text-foreground/80">
                  &ldquo;{book.quote}&rdquo;
                </blockquote>
                <div className="text-xs text-muted-foreground">
                  — {book.title} / {book.author}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
