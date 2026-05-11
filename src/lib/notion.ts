import { Client } from "@notionhq/client";
import type {
  PageObjectResponse,
  QueryDatabaseParameters,
} from "@notionhq/client/build/src/api-endpoints";
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

type PageProperties = PageObjectResponse["properties"];
type PageProperty = PageProperties[string];

function getProp<T extends PageProperty["type"]>(
  props: PageProperties,
  name: string,
  type: T,
): Extract<PageProperty, { type: T }> | undefined {
  const p = props[name];
  if (p && p.type === type) {
    return p as Extract<PageProperty, { type: T }>;
  }
  return undefined;
}

function pageToBook(page: PageObjectResponse): Book {
  const props = page.properties;

  const cover = getProp(props, "표지", "files");
  const coverFile = cover?.files[0];
  const coverUrl =
    coverFile && "file" in coverFile
      ? coverFile.file.url
      : coverFile && "external" in coverFile
        ? coverFile.external.url
        : "";

  const title = getProp(props, "제목", "title");
  const author = getProp(props, "저자", "rich_text");
  const genre = getProp(props, "장르", "select");
  const rating = getProp(props, "별점", "number");
  const readDate = getProp(props, "독서완료일", "date");
  const status = getProp(props, "상태", "select");
  const oneLineSummary = getProp(props, "한줄요약", "rich_text");
  const quote = getProp(props, "인용구", "rich_text");

  return {
    id: page.id,
    slug: page.id.replace(/-/g, ""),
    title: title?.title[0]?.plain_text ?? "",
    author: author?.rich_text[0]?.plain_text ?? "",
    genre: genre?.select?.name ?? "",
    rating: rating?.number ?? 0,
    readDate: readDate?.date?.start ?? "",
    coverUrl,
    status: (status?.select?.name ?? "읽고싶음") as Book["status"],
    oneLineSummary: oneLineSummary?.rich_text[0]?.plain_text ?? "",
    quote: quote?.rich_text[0]?.plain_text || undefined,
  };
}

export interface GetBooksOptions {
  genre?: string;
  minRating?: number;
  sort?: "readDate_desc" | "rating_desc";
  limit?: number;
  search?: string;
}

type PropertyFilter = NonNullable<QueryDatabaseParameters["filter"]>;
type AndFilter = Extract<PropertyFilter, { and: unknown }>["and"][number];

export async function getBooks(options: GetBooksOptions = {}): Promise<Book[]> {
  const { genre, minRating, sort = "readDate_desc", limit, search } = options;

  const andFilters: AndFilter[] = [
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

  const response = await notion.databases.query({
    database_id: DATABASE_ID,
    filter: andFilters.length === 1 ? andFilters[0] : { and: andFilters },
    sorts: [
      sort === "rating_desc"
        ? { property: "별점", direction: "descending" }
        : { property: "독서완료일", direction: "descending" },
    ],
    page_size: limit ?? 100,
  });

  return response.results
    .filter((r): r is PageObjectResponse => "properties" in r)
    .map(pageToBook);
}

const SLUG_PATTERN = /^[0-9a-f]{32}$/i;

export async function getBookBySlug(slug: string): Promise<Book | null> {
  if (!SLUG_PATTERN.test(slug)) return null;
  const pageId = slug.replace(
    /(.{8})(.{4})(.{4})(.{4})(.{12})/,
    "$1-$2-$3-$4-$5",
  );
  try {
    const page = await notion.pages.retrieve({ page_id: pageId });
    if (!("properties" in page)) return null;
    return pageToBook(page);
  } catch {
    return null;
  }
}

export async function getBookContent(pageId: string): Promise<string> {
  const n2m = new NotionToMarkdown({ notionClient: notion });
  const mdBlocks = await n2m.pageToMarkdown(pageId);
  return n2m.toMarkdownString(mdBlocks).parent;
}
