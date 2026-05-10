# PRD: 북 리뷰 사이트

## 프로젝트 개요

- 프로젝트명: 북 리뷰 사이트 (Book Reviews)
- 목적: Notion을 CMS로 활용한 개인 독서 기록 및 리뷰 공유 사이트
- CMS 선택 이유: Notion에서 독서 기록을 작성하면 자동으로 사이트에 반영

## 주요 기능

1. Notion 데이터베이스에서 책 목록 가져오기 (표지, 저자, 별점 표시)
2. 개별 리뷰 상세 페이지 표시
3. 장르별 필터링
4. 별점 범위별 필터링
5. 독서 통계 (연간 독서량, 장르 분포)
6. 반응형 디자인

## 기술 스택

- Frontend: Next.js 15, TypeScript
- CMS: Notion API (@notionhq/client)
- Styling: Tailwind CSS, shadcn/ui
- Icons: Lucide React
- Deployment: Vercel

## Notion 데이터베이스 구조

- Title: 책 제목 (title)
- Author: 저자 (rich_text)
- Genre: 장르 (select) - 소설/에세이/기술/자기계발
- Rating: 별점 (number) - 1~5
- ReadDate: 독서 완료일 (date)
- Cover: 표지 이미지 (files)
- Status: 상태 (select) - 읽는 중/완독/읽고 싶음
- OneLineSummary: 한 줄 요약 (rich_text)
- Content: 리뷰 본문 (page content)

## 화면 구성

- 홈: 최근 완독 책 목록 + 연간 독서 통계 요약
- 책 목록: 전체 목록, 장르/별점 필터, 정렬 (최신순/별점 높은순)
- 리뷰 상세: 책 정보 헤더 + Notion 본문 렌더링 + 이전/다음 네비게이션
- 통계: 연도별 독서량, 장르 분포, 별점 분포 차트

## MVP 범위

- Notion API 연동
- 책 목록 및 리뷰 상세 페이지
- 장르/별점 필터
- 기본 독서 통계
- 반응형 디자인

## 구현 단계

1. Notion API 패키지 설치 및 환경 설정
2. Notion 데이터베이스 생성 및 API 키 설정
3. 책 목록 페이지 구현
4. 리뷰 상세 페이지 구현 (Notion 콘텐츠 렌더링)
5. 장르/별점 필터 구현
6. 독서 통계 페이지 구현
7. 스타일링 및 최적화
