import { Client } from "@notionhq/client";
import { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { NotionToMarkdown } from "notion-to-md";
import { Book } from "@/types/book";

export const notion = new Client({ auth: process.env.NOTION_API_KEY });
export const DATABASE_ID = process.env.NOTION_DATABASE_ID!;

export async function testConnection() {
  const response = await notion.databases.retrieve({
    database_id: DATABASE_ID,
  });
  return response;
}

function pageToBook(page: PageObjectResponse): Book {
  const props = page.properties as any;
  const coverFiles = props["표지"]?.files ?? [];
  const coverUrl =
    coverFiles[0]?.file?.url ?? coverFiles[0]?.external?.url ?? "";

  return {
    id: page.id,
    slug: page.id.replace(/-/g, ""),
    title: props["제목"]?.title?.[0]?.plain_text ?? "",
    author: props["저자"]?.rich_text?.[0]?.plain_text ?? "",
    genre: props["장르"]?.select?.name ?? "",
    rating: props["별점"]?.number ?? 0,
    readDate: props["독서완료일"]?.date?.start ?? "",
    coverUrl,
    status: (props["상태"]?.select?.name ?? "읽고싶음") as Book["status"],
    oneLineSummary: props["한줄요약"]?.rich_text?.[0]?.plain_text ?? "",
    quote: props["인용구"]?.rich_text?.[0]?.plain_text || undefined,
  };
}

export interface GetBooksOptions {
  genre?: string;
  minRating?: number;
  sort?: "readDate_desc" | "rating_desc";
  limit?: number;
  search?: string;
}

export async function getBooks(options: GetBooksOptions = {}): Promise<Book[]> {
  const { genre, minRating, sort = "readDate_desc", limit, search } = options;

  const andFilters: any[] = [
    { property: "상태", select: { equals: "완독" } },
  ];
  if (genre) andFilters.push({ property: "장르", select: { equals: genre } });
  if (minRating)
    andFilters.push({
      property: "별점",
      number: { greater_than_or_equal_to: minRating },
    });
  if (search)
    andFilters.push({
      or: [
        { property: "제목", title: { contains: search } },
        { property: "저자", rich_text: { contains: search } },
      ],
    });

  const response = await notion.dataSources.query({
    data_source_id: DATABASE_ID,
    filter: andFilters.length === 1 ? andFilters[0] : { and: andFilters },
    sorts: [
      sort === "rating_desc"
        ? { property: "별점", direction: "descending" }
        : { property: "독서완료일", direction: "descending" },
    ],
    page_size: limit ?? 100,
  });

  return (response.results as PageObjectResponse[]).map(pageToBook);
}

export async function getBookBySlug(slug: string): Promise<Book | null> {
  try {
    const pageId = slug.replace(
      /(.{8})(.{4})(.{4})(.{4})(.{12})/,
      "$1-$2-$3-$4-$5"
    );
    const page = await notion.pages.retrieve({ page_id: pageId });
    return pageToBook(page as PageObjectResponse);
  } catch {
    return null;
  }
}

export async function getBookContent(pageId: string): Promise<string> {
  const n2m = new NotionToMarkdown({ notionClient: notion });
  const mdBlocks = await n2m.pageToMarkdown(pageId);
  return n2m.toMarkdownString(mdBlocks).parent;
}
