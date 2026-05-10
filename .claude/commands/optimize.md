---
description: 성능 최적화 기회 분석 및 개선 제안
argument-hint: <file-or-directory> (생략 시 전체 src/ 분석)
---

Analyze `$ARGUMENTS` (default `src/`) for performance optimization opportunities in this Next.js 16 project.

Check the following areas and report findings. For each issue include: location (file:line), estimated impact (High / Medium / Low), and a concrete before/after code example.

**Areas to analyze:**

1. **Server vs Client components**
   - Find `"use client"` directives on components that have no event handlers, no hooks, and no browser APIs — these should be server components
   - Find server components that pass large serialized objects as props when a smaller slice would do

2. **Bundle size**
   - Barrel imports (e.g. `import { x } from "lucide-react"` is fine; flag `import * as Icons from "lucide-react"`)
   - Heavy libraries imported at the top level that could be dynamic-imported (`next/dynamic`)
   - Unused shadcn/ui components imported but not rendered

3. **Data fetching**
   - `fetch()` calls inside loops — suggest `Promise.all`
   - Missing `cache` or `revalidate` options on `fetch()` in server components
   - Client components fetching data on mount that could be fetched server-side

4. **Rendering**
   - Large lists rendered without pagination or virtualization
   - Missing `key` props or unstable keys (e.g. array index) in mapped lists
   - Expensive computations not wrapped in `useMemo`

5. **Images & fonts**
   - Raw `<img>` tags that should use `next/image`
   - Font files loaded without `display: swap`

6. **Tailwind**
   - Repeated class strings that could be extracted into a `cva` variant
   - Unnecessary `!important` overrides

Output findings grouped by impact (High first), then a prioritized action plan with estimated effort (Quick win / Medium / Refactor).
