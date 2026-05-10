---
description: 배포 전 체크리스트 실행 및 문제점 보고
argument-hint: <target> (예: vercel, docker — 생략 시 일반 체크)
---

Run a pre-deployment checklist for this Next.js project targeting `$ARGUMENTS`.

Go through each item, check the actual project files, and report Pass / Fail / Warning with a brief reason.

**Checklist:**

### Build
- [ ] `npm run build` completes without errors (check for TypeScript errors and lint warnings)
- [ ] No `console.log` left in `src/` (use grep to check)
- [ ] No `TODO` or `FIXME` comments in production-critical paths (API routes, auth)

### Environment
- [ ] `.env.example` exists and is up to date
- [ ] `.env.local` and `.env` are in `.gitignore`
- [ ] No hardcoded secrets or API keys in source files

### Performance
- [ ] Images use `next/image` (check for raw `<img>` tags in `src/`)
- [ ] No `"use client"` on pages that don't need interactivity (server components preferred)
- [ ] Dynamic imports used for heavy client components

### SEO & Meta
- [ ] `metadata` export defined in root layout or individual pages
- [ ] `lang` attribute set on `<html>` (handled by next-intl locale)
- [ ] `robots.txt` and `sitemap.xml` present in `public/` (warn if missing, not fail)

### Security
- [ ] No `dangerouslySetInnerHTML` without sanitization
- [ ] API routes validate input before using it
- [ ] `next.config.ts` has security headers configured

### Vercel-specific (if target is vercel)
- [ ] `vercel.json` present if custom routes/rewrites are needed
- [ ] Environment variables added to Vercel project dashboard (remind user, cannot verify automatically)

Output a summary table at the end with total Pass / Fail / Warning counts and a deployment verdict: **Ready to deploy** or **Fix issues first**.
