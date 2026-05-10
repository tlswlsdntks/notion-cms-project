import { notFound } from "next/navigation";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import { getTranslations } from "next-intl/server";
import { getBooks, getBookBySlug, getBookContent } from "@/lib/notion";
import { RatingStars } from "@/components/RatingStars";
import { ShareButton } from "@/components/ShareButton";
import { Link } from "@/navigation";
import { Button } from "@/components/ui/button";

export const revalidate = 60;

export async function generateStaticParams() {
  try {
    const books = await getBooks();
    return books.map((book) => ({ slug: book.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}) {
  const { slug } = await params;
  try {
    const book = await getBookBySlug(slug);
    if (!book) return {};
    return {
      title: `${book.title} | 북 리뷰`,
      description: book.oneLineSummary,
      openGraph: {
        title: book.title,
        description: book.oneLineSummary,
        images: book.coverUrl ? [{ url: book.coverUrl }] : [],
      },
      twitter: {
        card: "summary_large_image",
        title: book.title,
        description: book.oneLineSummary,
      },
    };
  } catch {
    return {};
  }
}

export default async function BookDetailPage({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}) {
  const { slug } = await params;
  const t = await getTranslations("bookDetail");

  let book = null;
  let content = "";
  let allBooks: Awaited<ReturnType<typeof getBooks>> = [];

  try {
    book = await getBookBySlug(slug);
    if (!book) notFound();
    [content, allBooks] = await Promise.all([
      getBookContent(book.id),
      getBooks({ sort: "readDate_desc" }),
    ]);
  } catch {
    notFound();
  }

  if (!book) notFound();

  const currentIndex = allBooks.findIndex((b) => b.slug === slug);
  const prevBook = allBooks[currentIndex + 1] ?? null;
  const nextBook = allBooks[currentIndex - 1] ?? null;

  return (
    <div className="container mx-auto max-w-3xl px-4 py-12">
      {/* 헤더 */}
      <div className="flex gap-8 mb-12">
        {book.coverUrl && (
          <div className="relative w-40 h-56 flex-shrink-0 rounded-lg overflow-hidden">
            <Image
              src={book.coverUrl}
              alt={book.title}
              fill
              className="object-cover"
              sizes="160px"
            />
          </div>
        )}
        <div className="flex flex-col justify-end gap-2">
          <p className="text-sm text-muted-foreground">{book.genre}</p>
          <h1 className="text-2xl font-bold">{book.title}</h1>
          <p className="text-muted-foreground">{book.author}</p>
          <RatingStars rating={book.rating} />
          {book.oneLineSummary && (
            <p className="text-sm text-muted-foreground mt-2">
              {book.oneLineSummary}
            </p>
          )}
          {book.readDate && (
            <p className="text-xs text-muted-foreground">{book.readDate}</p>
          )}
          <ShareButton />
        </div>
      </div>

      {/* 리뷰 본문 */}
      {content && (
        <div className="space-y-4 text-sm leading-relaxed mb-16">
          <ReactMarkdown>{content}</ReactMarkdown>
        </div>
      )}

      {/* 이전/다음 네비게이션 */}
      <div className="flex justify-between border-t pt-8">
        <div>
          {prevBook && (
            <Link
              href={{
                pathname: "/books/[slug]",
                params: { slug: prevBook.slug },
              }}
            >
              <Button variant="outline" size="sm">
                ← {t("prevBook")}
              </Button>
            </Link>
          )}
        </div>
        <div>
          {nextBook && (
            <Link
              href={{
                pathname: "/books/[slug]",
                params: { slug: nextBook.slug },
              }}
            >
              <Button variant="outline" size="sm">
                {t("nextBook")} →
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
