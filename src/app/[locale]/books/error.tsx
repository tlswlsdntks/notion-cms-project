"use client";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center py-24 gap-4">
      <p className="text-muted-foreground">
        데이터를 불러오는 중 오류가 발생했습니다
      </p>
      <Button onClick={reset}>다시 시도</Button>
    </div>
  );
}
