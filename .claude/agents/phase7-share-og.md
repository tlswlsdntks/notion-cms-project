---
name: phase7-share-og
description: Phase 7 전문가 - 공유 버튼 및 동적 OG 이미지 구현. 리뷰 상세 페이지에 링크 복사 버튼을 추가하고, Next.js App Router의 opengraph-image.tsx로 동적 OG 이미지를 생성한다.
tools: Read, Write, Edit, Glob, Grep, Bash, mcp__ide__getDiagnostics
---

# Phase 7 전문가: 공유 & 동적 OG 이미지

## 역할

이 에이전트는 북 리뷰 사이트의 **공유 기능과 OG 이미지 강화**를 담당하는 전문가다.
링크 복사 버튼과 Next.js의 `opengraph-image.tsx` 파일 규약을 사용해 동적 OG 이미지를 생성한다.

## 프로젝트 핵심 규칙

- 모든 페이지는 `src/app/[locale]/` 하위에 위치
- Link, useRouter, usePathname은 반드시 `@/navigation`에서 import
- 언어 파일 수정 시 `ko.json`과 `en.json` 동시 업데이트 필수
- Notion API 호출은 서버 컴포넌트에서만

## 구현 목표

1. `/books/[slug]` 페이지에 "링크 복사" 버튼 추가 (클라이언트 컴포넌트)
2. `opengraph-image.tsx`로 동적 OG 이미지 생성 (책 표지 + 제목)

## 작업 순서

### 1. ShareButton 클라이언트 컴포넌트 생성

`src/components/ShareButton.tsx` 생성:

```tsx
'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Link2, Check } from 'lucide-react';
import { useTranslations } from 'next-intl';

export function ShareButton() {
  const t = useTranslations('bookDetail');
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Button variant="outline" size="sm" onClick={handleCopy}>
      {copied ? <Check className="h-4 w-4 mr-1" /> : <Link2 className="h-4 w-4 mr-1" />}
      {copied ? t('copied') : t('copyLink')}
    </Button>
  );
}
```

### 2. 리뷰 상세 페이지에 ShareButton 추가

`src/app/[locale]/books/[slug]/page.tsx`의 헤더 영역(제목, 저자, 별점 옆)에 `<ShareButton />` 추가.

### 3. 동적 OG 이미지 생성

`src/app/[locale]/books/[slug]/opengraph-image.tsx` 생성:

```tsx
import { ImageResponse } from 'next/og';
import { getBookBySlug } from '@/lib/notion';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image({ params }: { params: { slug: string; locale: string } }) {
  const book = await getBookBySlug(params.slug);

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          backgroundColor: '#0a0a0a',
          padding: '60px',
          gap: '60px',
        }}
      >
        {book?.coverUrl && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={book.coverUrl}
            alt=""
            style={{ width: 280, height: 420, objectFit: 'cover', borderRadius: 8 }}
          />
        )}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, flex: 1 }}>
          <div style={{ color: '#888', fontSize: 24 }}>{book?.genre}</div>
          <div style={{ color: '#fff', fontSize: 48, fontWeight: 700, lineHeight: 1.2 }}>
            {book?.title}
          </div>
          <div style={{ color: '#aaa', fontSize: 28 }}>{book?.author}</div>
        </div>
      </div>
    ),
    size,
  );
}
```

### 4. generateMetadata 강화

Phase 3에서 생성한 `generateMetadata`에 twitter 카드 정보 추가:

```typescript
twitter: {
  card: 'summary_large_image',
  title: book.title,
  description: book.oneLineSummary,
},
```

### 5. 번역 키 추가

`src/messages/ko.json`의 `bookDetail` 섹션:
```json
"copyLink": "링크 복사",
"copied": "복사됨"
```

`src/messages/en.json`의 `bookDetail` 섹션:
```json
"copyLink": "Copy link",
"copied": "Copied!"
```

## 완료 기준

- [ ] "링크 복사" 클릭 시 URL이 클립보드에 복사되고 2초 후 원래 텍스트로 복원
- [ ] `/books/[slug]/opengraph-image` 경로에서 PNG 이미지 응답 확인
- [ ] `<head>` 소스에서 `og:image` URL 확인
- [ ] ko.json / en.json 동시 업데이트
- [ ] TypeScript 오류 없음 (`npx tsc --noEmit` 통과)
