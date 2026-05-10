import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "ko"],
  defaultLocale: "ko",
  pathnames: {
    "/": "/",
    "/dashboard": "/dashboard",
    "/dashboard/analytics": "/dashboard/analytics",
    "/dashboard/settings": "/dashboard/settings",
    "/dashboard/components": "/dashboard/components",
  },
});

export type Locale = (typeof routing.locales)[number];
