---
description: src/components/ 폴더에 새 React 컴포넌트 파일 생성
argument-hint: <ComponentName>
---

Create a new React functional component named $ARGUMENTS.

Rules:
- File path: `src/components/$ARGUMENTS.tsx`
- If the name contains a slash (e.g. `layout/Header`), place it in the corresponding subfolder
- Use TypeScript with proper Props interface (name it `${ComponentName}Props`)
- Use Tailwind CSS for all styling — no inline styles, no CSS modules
- Export the component as a named export (not default)
- Do NOT add comments explaining what the code does
- Do NOT add placeholder TODO comments

Template to follow:

```tsx
import { cn } from "@/lib/utils";

interface $ARGUMENTSProps {
  className?: string;
}

export function $ARGUMENTS({ className }: $ARGUMENTSProps) {
  return (
    <div className={cn("", className)}>
    </div>
  );
}
```

After creating the file, print the exact file path created.
