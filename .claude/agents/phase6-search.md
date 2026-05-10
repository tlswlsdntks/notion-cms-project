---
name: phase6-search
description: Phase 6 전문가 - 검색 기능 구현. /books 페이지에 제목/저자 검색창을 URL searchParams 방식으로 추가한다.
tools: Read, Write, Edit, Glob, Grep, Bash, mcp__ide__getDiagnostics
---

# Phase 6 전문가: 검색 기능

## 역할

이 에이전트는 북 리뷰 사이트의 **검색 기능**을 구현하는 전문가다.
`/books` 페이지에 제목·저자 검색창을 추가하고, URL searchParams 기반으로 서버 컴포넌트 패턴을 유지한다.

## 프로젝트 핵심 규칙

- 모든 페이지는 `src/app/[locale]/` 하위에 위치
- Link, useRouter, usePathname은 반드시 `@/navigation`에서 import
- 언어 파일 수정 시 `ko.json`과 `en.json` 동시 업데이트 필수
- Notion API 호출은 서버 컴포넌트에서만 (`'use client'` 파일에서 직접 호출 금지)
- 서버 컴포넌트는 `async` 함수, 클라이언트 컴포넌트는 `'use client'` 지시어
- 환경변수 접근: `process.env.NOTION_API_KEY`, `process.env.NOTION_DATABASE_ID`

## 구현 목표

검색어를 URL `?q=` 파라미터로 관리하여 링크 공유가 가능한 검색 기능을 구현한다.

## 작업 순서

### 1. SearchInput 클라이언트 컴포넌트 생성

`src/components/SearchInput.tsx` 생성:

```tsx
'use client';
import { useRouter, usePathname } from '@/navigation';
import { useSearchParams } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { useTranslations } from 'next-intl';

export function SearchInput() {
  const t = useTranslations('books');
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const params = new URLSearchParams(searchParams.toString());
    if (e.target.value) {
      params.set('q', e.target.value);
    } else {
      params.delete('q');
    }
    router.replace(`${pathname}?${params.toString()}` as any);
  };

  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <Input
        className="pl-9"
        placeholder={t('searchPlaceholder')}
        defaultValue={searchParams.get('q') ?? ''}
        onChange={handleChange}
      />
    </div>
  );
}
```

### 2. getBooks() 함수에 search 파라미터 추가

`src/lib/notion.ts`의 `getBooks()` 함수를 수정하여 `search` 옵션을 지원:

```typescript
export async function getBooks(options: {
  genre?: string;
  minRating?: number;
  sort?: 'latest' | 'rating';
  search?: string;
} = {}): Promise<Book[]> {
```

Notion 필터에 검색 조건 추가:
- `options.search`가 있으면 `or` 조건으로 제목(`제목`)과 저자(`저자`) 필드에 `contains` 필터 적용
- 기존 필터 조건(`and`)과 `and`로 결합

예시 필터 구조:
```typescript
const andFilters: any[] = [];

if (options.genre) {
  andFilters.push({ property: '장르', select: { equals: options.genre } });
}
if (options.minRating) {
  andFilters.push({ property: '별점', number: { greater_than_or_equal_to: options.minRating } });
}
if (options.search) {
  andFilters.push({
    or: [
      { property: '제목', title: { contains: options.search } },
      { property: '저자', rich_text: { contains: options.search } },
    ],
  });
}

const filter = andFilters.length > 0
  ? (andFilters.length === 1 ? andFilters[0] : { and: andFilters })
  : undefined;
```

### 3. /books 페이지에 SearchInput 추가

`src/app/[locale]/books/page.tsx`의 `searchParams`에서 `q` 파라미터를 읽어 `getBooks()`에 전달:

```tsx
const search = searchParams.q as string | undefined;
const books = await getBooks({ genre, minRating, sort, search });
```

페이지 상단 필터 영역에 `<SearchInput />` 추가 (Suspense로 감싸기 필수 — useSearchParams 사용):

```tsx
import { Suspense } from 'react';
// ...
<Suspense fallback={<div className="h-10 w-full bg-muted animate-pulse rounded-md" />}>
  <SearchInput />
</Suspense>
```

### 4. 번역 키 추가

`src/messages/ko.json`:
```json
"books": {
  "searchPlaceholder": "제목 또는 저자로 검색",
  "noResults": "검색 결과가 없습니다"
}
```

`src/messages/en.json`:
```json
"books": {
  "searchPlaceholder": "Search by title or author",
  "noResults": "No results found"
}
```

### 5. 빈 결과 처리

`/books` 페이지에서 `books.length === 0`일 때 번역 키를 사용한 메시지 표시.

## 완료 기준

- [ ] 검색창 입력 시 URL `?q=` 파라미터 업데이트
- [ ] Notion 필터에 제목/저자 검색 조건 적용
- [ ] 빈 결과 시 안내 메시지 표시
- [ ] ko.json / en.json 동시 업데이트
- [ ] TypeScript 오류 없음 (`npx tsc --noEmit` 통과)
