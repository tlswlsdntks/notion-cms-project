"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface GenreFilterProps {
  genres: string[];
  selected: string;
  onChange: (genre: string) => void;
}

export function GenreFilter({ genres, selected, onChange }: GenreFilterProps) {
  const allGenres = ["전체", ...genres];
  return (
    <div className="flex flex-wrap gap-2">
      {allGenres.map((genre) => {
        const value = genre === "전체" ? "" : genre;
        return (
          <Button
            key={genre}
            variant={selected === value ? "default" : "outline"}
            size="sm"
            onClick={() => onChange(value)}
            className={cn("rounded-full")}
          >
            {genre}
          </Button>
        );
      })}
    </div>
  );
}
