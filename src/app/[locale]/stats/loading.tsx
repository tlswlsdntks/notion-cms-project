import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-12 space-y-12">
      <Skeleton className="h-9 w-32" />
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="space-y-4">
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-64 w-full rounded-lg" />
        </div>
      ))}
    </div>
  );
}
