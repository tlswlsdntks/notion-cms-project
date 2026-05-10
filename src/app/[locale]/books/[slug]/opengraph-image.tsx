import { ImageResponse } from "next/og";
import { getBookBySlug } from "@/lib/notion";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: { slug: string; locale: string };
}) {
  const book = await getBookBySlug(params.slug);

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        backgroundColor: "#0a0a0a",
        padding: "60px",
        gap: "60px",
      }}
    >
      {book?.coverUrl && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={book.coverUrl}
          alt=""
          style={{
            width: 280,
            height: 420,
            objectFit: "cover",
            borderRadius: 8,
          }}
        />
      )}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 16,
          flex: 1,
        }}
      >
        <div style={{ color: "#888", fontSize: 24 }}>{book?.genre}</div>
        <div
          style={{
            color: "#fff",
            fontSize: 48,
            fontWeight: 700,
            lineHeight: 1.2,
          }}
        >
          {book?.title}
        </div>
        <div style={{ color: "#aaa", fontSize: 28 }}>{book?.author}</div>
      </div>
    </div>,
    size,
  );
}
