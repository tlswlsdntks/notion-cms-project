# PRD: 북 리뷰 사이트

## 1. 프로젝트 개요

| 항목 | 내용 |
|------|------|
| **프로젝트명** | 북 리뷰 사이트 (Book Reviews) |
| **목적** | Notion을 CMS로 활용한 개인 독서 기록 및 리뷰 공유 사이트 |
| **CMS 선택 이유** | Notion에서 독서 기록을 작성하면 자동으로 사이트에 반영, 별도 관리 도구 불필요 |

---

## 2. 주요 기능

### 2.1 핵심 기능

1. **책 목록 페이지** — Notion 데이터베이스에서 읽은 책 목록 가져오기 (표지, 저자, 별점 표시)
2. **리뷰 상세 페이지** — 개별 책의 상세 리뷰 내용 표시
3. **장르 필터링** — 장르(select)별 책 목록 필터
4. **별점 필터링** — 별점 범위별 필터 (예: ★4 이상)
5. **독서 통계** — 연간 독서량, 장르 분포 등 시각화
6. **반응형 디자인** — 모바일/태블릿/데스크탑 대응

### 2.2 MVP 범위

- Notion API 연동 및 책 목록 표시
- 리뷰 상세 페이지 (Notion 페이지 콘텐츠 렌더링)
- 장르 필터 및 별점 필터
- 기본 독서 통계 (연간 독서량)
- 반응형 기본 스타일링

---

## 3. 기술 스택

| 영역 | 기술 |
|------|------|
| **Frontend** | Next.js 15 (App Router), TypeScript |
| **CMS** | Notion API (`@notionhq/client`) |
| **Styling** | Tailwind CSS, shadcn/ui |
| **Icons** | Lucide React |
| **Deployment** | Vercel |

---

## 4. Notion 데이터베이스 구조

| 필드명 | 타입 | 설명 |
|--------|------|------|
| `Title` | title | 책 제목 |
| `Author` | rich_text | 저자 |
| `Genre` | select | 장르 (소설, 에세이, 기술, 자기계발 등) |
| `Rating` | number | 별점 (1 ~ 5) |
| `ReadDate` | date | 독서 완료일 |
| `Cover` | files | 책 표지 이미지 |
| `Status` | select | 상태 (읽는 중 / 완독 / 읽고 싶음) |
| `OneLineSummary` | rich_text | 한 줄 요약 |
| `Content` | page content | 상세 리뷰 본문 |

---

## 5. 화면 구성

### 5.1 홈 (`/`)
- 최근 완독 책 목록 (카드 그리드)
- 연간 독서 통계 요약 (올해 N권 읽음)
- 장르 필터 탭

### 5.2 책 목록 (`/books`)
- 전체 완독 목록 (무한 스크롤 또는 페이지네이션)
- 장르 / 별점 필터
- 정렬 (최신순 / 별점 높은순)

### 5.3 리뷰 상세 (`/books/[slug]`)
- 책 표지, 제목, 저자, 별점 헤더
- Notion 페이지 콘텐츠 렌더링 (notion-to-md 또는 react-notion-x)
- 이전/다음 책 네비게이션

### 5.4 통계 (`/stats`)
- 연도별 독서량 바 차트
- 장르 분포 파이 차트
- 별점 분포

---

## 6. 구현 단계

| 단계 | 작업 | 검증 |
|------|------|------|
| 1 | Notion API 패키지 설치 및 환경변수 설정 | `.env.local` 구성 완료 |
| 2 | Notion 데이터베이스 생성 및 샘플 데이터 3건 입력 | API 호출로 데이터 조회 확인 |
| 3 | 책 목록 페이지 구현 (카드 컴포넌트 포함) | 목록 정상 렌더링 |
| 4 | 리뷰 상세 페이지 구현 (Notion 콘텐츠 렌더링) | 본문 정상 표시 |
| 5 | 장르/별점 필터 구현 | 필터 동작 확인 |
| 6 | 독서 통계 페이지 구현 | 차트 렌더링 확인 |
| 7 | 스타일링 완성 및 반응형 점검 | 3개 뷰포트 확인 |
| 8 | Vercel 배포 및 환경변수 설정 | 프로덕션 URL 접근 확인 |

---

## 7. 환경변수

```env
NOTION_API_KEY=secret_xxxx
NOTION_DATABASE_ID=xxxx
```

---

## 8. 디렉토리 구조 (예상)

```
src/
├── app/
│   ├── page.tsx              # 홈
│   ├── books/
│   │   ├── page.tsx          # 책 목록
│   │   └── [slug]/
│   │       └── page.tsx      # 리뷰 상세
│   └── stats/
│       └── page.tsx          # 독서 통계
├── components/
│   ├── BookCard.tsx
│   ├── RatingStars.tsx
│   ├── GenreFilter.tsx
│   └── StatsChart.tsx
└── lib/
    └── notion.ts             # Notion API 클라이언트
```

---

## 9. 비기능 요구사항

- **성능**: ISR(Incremental Static Regeneration)으로 60초마다 재생성, 빠른 초기 로드
- **SEO**: 각 리뷰 페이지 메타 태그 (og:image = 책 표지)
- **접근성**: 이미지 alt 텍스트, 키보드 탐색 지원
- **에러 처리**: Notion API 실패 시 graceful fallback

---

## 10. 출시 기준 (Definition of Done)

- [ ] 홈, 책 목록, 상세, 통계 4개 페이지 정상 동작
- [ ] 장르/별점 필터 동작
- [ ] 모바일(375px), 태블릿(768px), 데스크탑(1280px) 레이아웃 확인
- [ ] Vercel 배포 완료 및 Notion 데이터 실시간 반영 확인
