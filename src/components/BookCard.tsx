import Image from "next/image";
import { Link } from "@/navigation";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RatingStars } from "@/components/RatingStars";
import { Book } from "@/types/book";

interface BookCardProps {
  book: Book;
}

export function BookCard({ book }: BookCardProps) {
  return (
    <Link href={{ pathname: "/books/[slug]", params: { slug: book.slug } }}>
      <Card className="h-full overflow-hidden hover:border-border transition-colors">
        <CardHeader className="p-0">
          <div className="relative aspect-[2/3] w-full overflow-hidden bg-muted">
            {book.coverUrl ? (
              <Image
                src={book.coverUrl}
                alt={book.title}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-muted-foreground text-sm">
                표지 없음
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent className="p-4 space-y-2">
          <Badge variant="secondary" className="text-xs">
            {book.genre}
          </Badge>
          <h3 className="font-semibold leading-snug line-clamp-2">
            {book.title}
          </h3>
          <p className="text-sm text-muted-foreground">{book.author}</p>
          <RatingStars rating={book.rating} size="sm" />
          {book.oneLineSummary && (
            <p className="text-xs text-muted-foreground line-clamp-2">
              {book.oneLineSummary}
            </p>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}
