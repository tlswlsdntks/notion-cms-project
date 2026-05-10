---
description: src/app/[locale]/ 아래 새 페이지 생성 및 라우팅 추가
argument-hint: <route-path> (예: dashboard/reports, profile)
---

Create a new Next.js App Router page at the route `$ARGUMENTS`.

Steps:
1. Create `src/app/[locale]/$ARGUMENTS/page.tsx` as a server component
2. If the route is inside `dashboard/`, reuse the existing `DashboardHeader` component from `src/components/layout/dashboard-header.tsx`
3. Add matching translation keys to both `messages/ko.json` and `messages/en.json` under a key derived from the route path
4. The page must call `getTranslations()` from `next-intl/server`

Page template for dashboard sub-routes:
```tsx
import { getTranslations } from "next-intl/server";
import { DashboardHeader } from "@/components/layout/dashboard-header";

export default async function Page() {
  const t = await getTranslations("<namespace>");

  return (
    <>
      <DashboardHeader title={t("title")} description={t("description")} />
      <div className="flex-1 p-6">
        {/* page content */}
      </div>
    </>
  );
}
```

Page template for top-level routes:
```tsx
import { getTranslations } from "next-intl/server";

export default async function Page() {
  const t = await getTranslations("<namespace>");

  return (
    <div className="container mx-auto max-w-6xl px-4 py-12">
      {/* page content */}
    </div>
  );
}
```

After creating the file, print the file path and the translation keys added.
