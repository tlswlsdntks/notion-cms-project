import { getTranslations } from "next-intl/server";

interface ReadingGoalProps {
  currentCount: number;
  locale: string;
}

export async function ReadingGoal({ currentCount, locale }: ReadingGoalProps) {
  const t = await getTranslations({ locale, namespace: "home" });
  const goal = Number(process.env.NEXT_PUBLIC_YEARLY_GOAL ?? 0);

  if (!goal) return null;

  const percent = Math.min(Math.round((currentCount / goal) * 100), 100);
  const achieved = currentCount >= goal;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground">
          {t("goal", { current: currentCount, total: goal })}
        </span>
        <span
          className={
            achieved ? "text-green-500 font-semibold" : "text-muted-foreground"
          }
        >
          {percent}%{achieved && " ✓"}
        </span>
      </div>
      <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all ${
            achieved ? "bg-green-500" : "bg-primary"
          }`}
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
