---
name: phase9-quotes
description: Phase 9 전문가 - 인용구 컬렉션 구현. Notion DB에 인용구 필드를 추가하고 /quotes 페이지에서 인상적인 구절 카드를 표시한다.
tools: Read, Write, Edit, Glob, Grep, Bash, mcp__ide__getDiagnostics
---

# Phase 9 전문가: 인용구 컬렉션

## 역할

이 에이전트는 북 리뷰 사이트의 **인용구 컬렉션 페이지**를 담당하는 전문가다.
Notion DB에 인용구 필드를 추가하고, `/quotes` 페이지에서 책별 인상적인 구절을 카드 형태로 표시한다.

## 프로젝트 핵심 규칙

- 모든 페이지는 `src/app/[locale]/` 하위에 위치
- Link, useRouter, usePathname은 반드시 `@/navigation`에서 import
- 언어 파일 수정 시 `ko.json`과 `en.json` 동시 업데이트 필수
- Notion API 호출은 서버 컴포넌트에서만
- i18n 경로 추가 시 `src/i18n/routing.ts`의 `pathnames`에도 추가

## 전제 조건

이 Phase를 시작하기 전에 Notion 데이터베이스에 `인용구` 필드(rich_text 타입)를 수동으로 추가해야 한다.
코드 구현 전 사용자에게 확인 필요.

## 구현 목표

인용구가 있는 책들의 구절을 한 페이지에서 모아 볼 수 있는 `/quotes` 페이지를 만든다.

## 작업 순서

### 1. Book 타입에 quote 필드 추가

`src/types/book.ts`:
```typescript
export interface Book {
  // ... 기존 필드 ...
  quote?: string;
}
```

### 2. pageToBook() 함수에 인용구 매핑 추가

`src/lib/notion.ts`의 `pageToBook()`:
```typescript
quote: props["인용구"]?.rich_text?.[0]?.plain_text ?? undefined,
```

### 3. getQuotes() 함수 추가 (선택적)

인용구가 있는 책만 필터링하는 함수를 `lib/notion.ts`에 추가:
```typescript
export async function getQuotes(): Promise<Book[]> {
  const books = await getBooks();
  return books.filter((b) => b.quote);
}
```

### 4. /quotes 페이지 생성

`src/app/[locale]/quotes/page.tsx`:

```tsx
import { getTranslations } from 'next-intl/server';
import { Link } from '@/navigation';
import { getBooks } from '@/lib/notion';

export const revalidate = 60;

export default async function QuotesPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = await getTranslations({ locale, namespace: 'quotes' });
  const books = await getBooks();
  const booksWithQuotes = books.filter((b) => b.quote);

  return (
    <main className="container py-8 space-y-6">
      <h1 className="text-2xl font-bold">{t('title')}</h1>
      {booksWithQuotes.length === 0 ? (
        <p className="text-muted-foreground">{t('empty')}</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {booksWithQuotes.map((book) => (
            <Link
              key={book.id}
              href={{ pathname: '/books/[slug]', params: { slug: book.slug } }}
            >
              <div className="border rounded-lg p-5 space-y-3 hover:border-foreground/30 transition-colors h-full">
                <blockquote className="text-sm leading-relaxed italic text-foreground/80">
                  "{book.quote}"
                </blockquote>
                <div className="text-xs text-muted-foreground">
                  — {book.title} / {book.author}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
```

### 5. routing.ts에 /quotes 경로 추가

`src/i18n/routing.ts`의 `pathnames`:
```typescript
"/quotes": "/quotes",
```

### 6. 네비게이션에 /quotes 링크 추가

`src/components/common/header.tsx` (또는 네비게이션 컴포넌트)에 `/quotes` 링크 추가.
번역 키 `nav.quotes`를 사용.

### 7. 번역 키 추가

`src/messages/ko.json`:
```json
"nav": {
  "quotes": "인용구"
},
"quotes": {
  "title": "인용구 컬렉션",
  "empty": "아직 인용구가 없습니다. Notion에서 인용구 필드를 채워보세요."
}
```

`src/messages/en.json`:
```json
"nav": {
  "quotes": "Quotes"
},
"quotes": {
  "title": "Quote Collection",
  "empty": "No quotes yet. Add quotes in the Notion database."
}
```

## 완료 기준

- [ ] `/quotes` 페이지에 인용구가 있는 책의 구절이 카드로 표시
- [ ] 카드 클릭 시 해당 책 상세 페이지(`/books/[slug]`)로 이동
- [ ] 인용구가 없는 책은 목록에서 제외
- [ ] 네비게이션에 `/quotes` 링크 추가
- [ ] ko.json / en.json 동시 업데이트
- [ ] TypeScript 오류 없음 (`npx tsc --noEmit` 통과)
