"use client";

import { useRouter, usePathname } from "@/navigation";
import { GenreFilter } from "@/components/GenreFilter";

interface GenreFilterWrapperProps {
  genres: string[];
  selected: string;
}

export function GenreFilterWrapper({
  genres,
  selected,
}: GenreFilterWrapperProps) {
  const router = useRouter();
  const pathname = usePathname();

  const handleChange = (genre: string) => {
    const params = new URLSearchParams();
    if (genre) params.set("genre", genre);
    router.push(
      `${pathname}${params.toString() ? `?${params.toString()}` : ""}` as any,
    );
  };

  return (
    <GenreFilter genres={genres} selected={selected} onChange={handleChange} />
  );
}
