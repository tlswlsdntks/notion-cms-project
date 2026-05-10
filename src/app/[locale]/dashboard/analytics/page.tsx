import { getTranslations } from "next-intl/server";
import { DashboardHeader } from "@/components/layout/dashboard-header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const chartData = [
  { month: "Jan", value: 65 },
  { month: "Feb", value: 78 },
  { month: "Mar", value: 55 },
  { month: "Apr", value: 91 },
  { month: "May", value: 83 },
  { month: "Jun", value: 72 },
  { month: "Jul", value: 95 },
  { month: "Aug", value: 88 },
];

export default async function AnalyticsPage() {
  const t = await getTranslations("dashboard.analytics");
  const max = Math.max(...chartData.map((d) => d.value));

  return (
    <>
      <DashboardHeader title={t("title")} description={t("description")} />
      <div className="flex-1 space-y-6 p-6">
        <Card>
          <CardHeader>
            <CardTitle>{t("monthlyOverview")}</CardTitle>
            <CardDescription>{t("monthlyDescription")}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-end gap-2 h-48">
              {chartData.map(({ month, value }) => (
                <div key={month} className="flex flex-1 flex-col items-center gap-1">
                  <span className="text-xs text-muted-foreground">{value}</span>
                  <div
                    className="w-full rounded-t-sm bg-primary transition-all"
                    style={{ height: `${(value / max) * 160}px` }}
                  />
                  <span className="text-xs text-muted-foreground">{month}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-4 md:grid-cols-3">
          {([
            { labelKey: "pageViews", value: "1.2M", trend: "+14.2%", color: "text-blue-500" },
            { labelKey: "uniqueVisitors", value: "84.5K", trend: "+9.1%", color: "text-green-500" },
            { labelKey: "bounceRate", value: "32.4%", trend: "-2.3%", color: "text-red-500" },
          ] as const).map((item) => (
            <Card key={item.labelKey}>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">{t(item.labelKey)}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{item.value}</div>
                <Badge variant="outline" className={`mt-1 text-xs ${item.color}`}>
                  {item.trend}
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
}
