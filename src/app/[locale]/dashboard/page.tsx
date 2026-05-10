import { getTranslations } from "next-intl/server";
import { DashboardHeader } from "@/components/layout/dashboard-header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, DollarSign, FolderOpen, TrendingUp } from "lucide-react";

const stats = [
  { key: "totalUsers", value: "12,483", change: "+12%", icon: Users },
  { key: "revenue", value: "$48,295", change: "+8.2%", icon: DollarSign },
  { key: "activeProjects", value: "24", change: "+3", icon: FolderOpen },
  { key: "growth", value: "18.7%", change: "+2.4%", icon: TrendingUp },
] as const;

const activities = [
  { user: "Alice Kim", action: "created a new project", time: "2 min ago" },
  { user: "Bob Lee", action: "updated the dashboard layout", time: "15 min ago" },
  { user: "Carol Park", action: "deployed to production", time: "1 hour ago" },
  { user: "David Choi", action: "added a new component", time: "3 hours ago" },
  { user: "Eva Shin", action: "fixed a bug in the form", time: "5 hours ago" },
];

export default async function DashboardPage() {
  const t = await getTranslations("dashboard.overview");

  return (
    <>
      <DashboardHeader title={t("title")} description={t("description")} />
      <div className="flex-1 space-y-6 p-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map(({ key, value, change, icon: Icon }) => (
            <Card key={key}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {t(key)}
                </CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{value}</div>
                <p className="mt-1 text-xs text-muted-foreground">
                  <span className="text-green-500">{change}</span> {t("fromLastMonth")}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>{t("recentActivity")}</CardTitle>
              <CardDescription>{t("activityDescription")}</CardDescription>
            </div>
            <Badge variant="secondary">{t("viewAll")}</Badge>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activities.map((activity) => (
                <div key={`${activity.user}-${activity.time}`} className="flex items-center gap-4">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-muted text-sm font-medium">
                    {activity.user[0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">
                      <span className="font-semibold">{activity.user}</span>{" "}
                      {activity.action}
                    </p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
