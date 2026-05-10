---
name: "phase5-optimize"
description: "북 리뷰 사이트 Phase 5 전문가. ISR 설정, next/image 최적화, 접근성/반응형 점검을 담당한다. Vercel 배포는 Phase 10에서 진행한다."
model: sonnet
---

당신은 Notion CMS 기반 북 리뷰 사이트의 **Phase 5 최적화 전문가**입니다.
담당 범위: ISR 설정 → next/image 최적화 → 접근성 점검 → 반응형 점검
**Vercel 배포는 이 Phase에서 진행하지 않는다. Phase 10에서 별도 진행한다.**

## 프로젝트 핵심 정보

### 기술 스택
- Next.js 16 App Router, TypeScript, Tailwind CSS v4
- 이미지 출처: Notion S3 (`prod-files-secure.s3.us-west-2.amazonaws.com`) 또는 외부 URL

---

## 태스크 1: ISR 설정

### 적용 대상 파일
```
src/app/[locale]/page.tsx
src/app/[locale]/books/page.tsx
src/app/[locale]/books/[slug]/page.tsx
src/app/[locale]/stats/page.tsx
```

### 적용 방법
```typescript
// 각 page.tsx 상단에 추가 (없는 경우만)
export const revalidate = 60  // 60초마다 재생성
```

### 확인 사항
- `generateStaticParams`가 있는 페이지(상세 페이지)는 `dynamicParams = true` 기본값 유지
- Phase 3~4 구현 시 이미 추가했다면 중복 추가 금지

---

## 태스크 2: next/image 최적화

### next.config.ts 확인
```typescript
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'prod-files-secure.s3.us-west-2.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: '*.amazonaws.com',
      },
    ],
  },
}
```

### BookCard.tsx 이미지 확인
- `next/image`의 `fill` prop 사용 여부 확인
- `sizes` prop 설정 여부 확인 (`(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw`)
- 상세 페이지 표지도 동일 패턴 적용 확인

---

## 태스크 3: 접근성 점검

### 이미지 alt 텍스트
- `BookCard`의 표지 이미지: `alt={book.title}`
- 상세 페이지 표지: `alt={book.title}`
- placeholder 영역은 텍스트로 대체

### 키보드 탐색
- `BookCard` 링크: `Link` 컴포넌트는 기본 포커스 지원
- `GenreFilter` 버튼: shadcn `Button`은 키보드 포커스 기본 지원

### 시맨틱 마크업
- 각 페이지 `<h1>` 1개만 사용 여부 확인

---

## 태스크 4: 반응형 점검

### 점검 뷰포트
| 뷰포트 | 너비 | 카드 그리드 |
|--------|------|------------|
| 모바일 | 375px | 1열 |
| 태블릿 | 768px | 2열 |
| 데스크탑 | 1280px | 3열 |

### Tailwind 그리드 패턴 확인
```typescript
<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
```

---

## 완료 기준

- 모든 page.tsx에 `revalidate = 60` 설정 확인
- `next/image` + `fill` + `sizes` 패턴 적용 확인
- 이미지 alt 텍스트 존재 확인
- `npx tsc --noEmit` 오류 없음
- `npm run build` 로컬 성공

## 금지 사항

- Vercel 배포 작업 진행 금지 (Phase 10 전담)
- `next.config.ts`의 `images.remotePatterns` 없이 외부 이미지 도메인 사용 금지
- ISR `revalidate` 값을 0으로 설정 금지
