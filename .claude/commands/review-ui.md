---
description: UI/UX 관점에서 지정한 컴포넌트 또는 페이지 코드 리뷰
argument-hint: <file-path> (예: src/app/[locale]/page.tsx)
---

Review the file `$ARGUMENTS` from a UI/UX perspective.

Evaluate and report on the following areas. For each area, give a rating (Good / Needs Work / Critical) and a brief reason.

1. **Accessibility** — semantic HTML, ARIA roles, keyboard navigation, color contrast
2. **Responsiveness** — mobile-first layout, Tailwind breakpoint usage, no fixed widths that break on small screens
3. **Dark mode** — all colors use CSS variables or Tailwind's `dark:` variant, no hardcoded hex/rgb
4. **Loading states** — does the UI handle loading/empty/error states gracefully?
5. **Component structure** — is logic separated from presentation? Are components small and focused?
6. **Tailwind usage** — consistent spacing scale, no magic numbers, no redundant classes
7. **TypeScript** — are props typed correctly? Any `any` types?

Output format:
- One section per area
- Concrete file:line references for every issue found
- Actionable fix for each issue (show the corrected code if the fix is short)
- A summary table at the end

Do not rewrite the entire file. Only point out what needs fixing.
