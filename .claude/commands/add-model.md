---
description: Prisma 스키마에 새 데이터 모델 추가 및 타입 정의 생성
argument-hint: <ModelName> (예: User, Post, Comment)
---

Add a new Prisma model named `$ARGUMENTS` to the project.

Steps:
1. Check if `prisma/schema.prisma` exists. If not, inform the user that Prisma is not set up and stop.
2. Append the new model block to `prisma/schema.prisma` following the existing style.
3. Create `src/types/$ARGUMENTS.ts` with TypeScript types derived from the model (input, output, partial update).
4. Create `src/lib/$ARGUMENTS.ts` with basic CRUD helper functions that wrap `prisma.$ARGUMENTS`.

Model conventions:
- Always include `id String @id @default(cuid())`
- Always include `createdAt DateTime @default(now())` and `updatedAt DateTime @updatedAt`
- Use `String` for text fields, `Int`/`Float` for numbers, `Boolean` for flags
- Add `@map` and `@@map` if the table name should differ from the model name

CRUD helper template:
```ts
import { prisma } from "@/lib/prisma";

export function findAll$ARGUMENTS() {
  return prisma.$ARGUMENTS.findMany();
}

export function find$ARGUMENTSById(id: string) {
  return prisma.$ARGUMENTS.findUnique({ where: { id } });
}

export function create$ARGUMENTS(data: Create$ARGUMENTSInput) {
  return prisma.$ARGUMENTS.create({ data });
}

export function update$ARGUMENTS(id: string, data: Partial<Create$ARGUMENTSInput>) {
  return prisma.$ARGUMENTS.update({ where: { id }, data });
}

export function delete$ARGUMENTS(id: string) {
  return prisma.$ARGUMENTS.delete({ where: { id } });
}
```

After creating files, remind the user to run `npx prisma migrate dev` to apply the schema change.
