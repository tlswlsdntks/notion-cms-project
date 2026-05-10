---
description: src/app/api/ 아래 새 API Route Handler 생성
argument-hint: <route-path> (예: users, posts/[id])
---

Create a new Next.js App Router API route at `src/app/api/$ARGUMENTS/route.ts`.

Requirements:
- Use the Web-standard `Request` / `Response` API (Next.js 15+ style)
- Export named handlers: `GET`, `POST`, `PUT`, `DELETE` — only the ones that make sense for this resource
- Always return `Response.json()` with a consistent shape: `{ data, error, status }`
- Handle errors with try/catch and return appropriate HTTP status codes (400, 404, 500)
- Add input validation comments where user-supplied data is used (mark with `// TODO: validate`)
- Use TypeScript — define request body types inline

Template:
```ts
import { NextRequest } from "next/server";

export async function GET(_req: NextRequest) {
  try {
    return Response.json({ data: null, error: null }, { status: 200 });
  } catch {
    return Response.json({ data: null, error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json(); // TODO: validate
    return Response.json({ data: body, error: null }, { status: 201 });
  } catch {
    return Response.json({ data: null, error: "Internal server error" }, { status: 500 });
  }
}
```

After creating the file, print the file path and a list of exported HTTP methods.
