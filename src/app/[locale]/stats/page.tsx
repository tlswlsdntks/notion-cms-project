import { getTranslations } from "next-intl/server";
import { getBooks } from "@/lib/notion";
import { StatsChart } from "@/components/StatsChart";

export const revalidate = 60;

export const metadata = {
  title: "독서 통계 | 북 리뷰",
  description: "연도별 독서량, 장르 분포, 별점 분포 통계",
};

export default async function StatsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "stats" });

  let books: Awaited<ReturnType<typeof getBooks>> = [];
  try {
    books = await getBooks();
  } catch {
    books = [];
  }

  // 연도별 독서량
  const yearlyMap: Record<string, number> = {};
  books.forEach((b) => {
    const year = b.readDate?.slice(0, 4) ?? "미상";
    yearlyMap[year] = (yearlyMap[year] ?? 0) + 1;
  });
  const yearlyData = Object.entries(yearlyMap)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([year, count]) => ({ year, count }));

  // 장르 분포
  const genreMap: Record<string, number> = {};
  books.forEach((b) => {
    if (b.genre) genreMap[b.genre] = (genreMap[b.genre] ?? 0) + 1;
  });
  const genreData = Object.entries(genreMap).map(([genre, count]) => ({
    genre,
    count,
  }));

  // 별점 분포
  const ratingData = [1, 2, 3, 4, 5].map((r) => ({
    rating: `${r}점`,
    count: books.filter((b) => b.rating === r).length,
  }));

  return (
    <div className="container mx-auto max-w-4xl px-4 py-12 space-y-12">
      <h1 className="text-3xl font-bold">{t("title")}</h1>
      {books.length === 0 ? (
        <p className="text-muted-foreground">{t("noData")}</p>
      ) : (
        <StatsChart
          yearlyData={yearlyData}
          genreData={genreData}
          ratingData={ratingData}
          labels={{
            yearlyChart: t("yearlyChart"),
            genreChart: t("genreChart"),
            ratingChart: t("ratingChart"),
            booksCount: t("booksCount"),
          }}
        />
      )}
    </div>
  );
}
