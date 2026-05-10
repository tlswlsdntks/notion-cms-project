import { getTranslations } from "next-intl/server";
import { DashboardHeader } from "@/components/layout/dashboard-header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

export default async function ComponentsPage() {
  const t = await getTranslations("dashboard.components");

  return (
    <>
      <DashboardHeader title={t("title")} description={t("description")} />
      <div className="flex-1 space-y-6 p-6">
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">{t("buttons")}</CardTitle>
              <CardDescription>{t("buttonsDesc")}</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              <Button>Default</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="destructive">Destructive</Button>
              <Button size="sm">Small</Button>
              <Button size="lg">Large</Button>
              <Button disabled>Disabled</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">{t("badges")}</CardTitle>
              <CardDescription>{t("badgesDesc")}</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              <Badge>Default</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="outline">Outline</Badge>
              <Badge variant="destructive">Destructive</Badge>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">{t("formInputs")}</CardTitle>
              <CardDescription>{t("formInputsDesc")}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="demo-input">Label</Label>
                <Input id="demo-input" placeholder="Enter text..." />
              </div>
              <div className="space-y-2">
                <Label htmlFor="demo-disabled">Disabled</Label>
                <Input id="demo-disabled" placeholder="Disabled input" disabled />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">{t("avatars")}</CardTitle>
              <CardDescription>{t("avatarsDesc")}</CardDescription>
            </CardHeader>
            <CardContent className="flex items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarFallback className="text-xl">JD</AvatarFallback>
              </Avatar>
              <Avatar className="h-12 w-12">
                <AvatarFallback>AB</AvatarFallback>
              </Avatar>
              <Avatar className="h-9 w-9">
                <AvatarFallback className="text-xs">CD</AvatarFallback>
              </Avatar>
              <Avatar className="h-7 w-7">
                <AvatarFallback className="text-xs">EF</AvatarFallback>
              </Avatar>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">{t("skeleton")}</CardTitle>
              <CardDescription>{t("skeletonDesc")}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-3">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div className="space-y-2 flex-1">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-3 w-1/2" />
                </div>
              </div>
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-4 w-4/6" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">{t("separator")}</CardTitle>
              <CardDescription>{t("separatorDesc")}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm">Section A</p>
              <Separator />
              <p className="text-sm">Section B</p>
              <div className="flex items-center gap-3 h-5">
                <span className="text-sm">Left</span>
                <Separator orientation="vertical" />
                <span className="text-sm">Middle</span>
                <Separator orientation="vertical" />
                <span className="text-sm">Right</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
