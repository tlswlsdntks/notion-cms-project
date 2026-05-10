import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface RatingStarsProps {
  rating: number;
  size?: "sm" | "md";
}

export function RatingStars({ rating, size = "md" }: RatingStarsProps) {
  const iconSize = size === "sm" ? "h-3 w-3" : "h-4 w-4";
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={cn(
            iconSize,
            i < rating
              ? "fill-yellow-400 text-yellow-400"
              : "text-muted-foreground",
          )}
        />
      ))}
    </div>
  );
}
