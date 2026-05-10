"use client";

import { useRouter, usePathname } from "@/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SortFilterWrapperProps {
  sort: string;
  minRating: string;
}

export function SortFilterWrapper({ sort, minRating }: SortFilterWrapperProps) {
  const router = useRouter();
  const pathname = usePathname();

  const updateParam = (key: string, value: string) => {
    const params = new URLSearchParams(
      typeof window !== "undefined" ? window.location.search : "",
    );
    if (value) params.set(key, value);
    else params.delete(key);
    router.push(`${pathname ?? ""}?${params.toString()}` as any);
  };

  const sortLabel = sort === "rating_desc" ? "별점순" : "최신순";

  return (
    <div className="flex gap-2">
      <Select value={sort} onValueChange={(v) => updateParam("sort", v ?? "")}>
        <SelectTrigger className="w-28">
          <span>{sortLabel}</span>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="readDate_desc">최신순</SelectItem>
          <SelectItem value="rating_desc">별점순</SelectItem>
        </SelectContent>
      </Select>

      <Select
        value={minRating}
        onValueChange={(v) => updateParam("minRating", v ?? "")}
      >
        <SelectTrigger className="w-32">
          <SelectValue placeholder="별점 필터" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="">전체</SelectItem>
          <SelectItem value="3">3점 이상</SelectItem>
          <SelectItem value="4">4점 이상</SelectItem>
          <SelectItem value="5">5점</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
