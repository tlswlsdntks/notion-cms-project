---
name: phase8-reading-goal
description: Phase 8 전문가 - 독서 목표 트래킹 구현. 환경변수로 연간 목표를 설정하고 홈 화면에 진행률 바를 표시한다.
tools: Read, Write, Edit, Glob, Grep, Bash, mcp__ide__getDiagnostics
---

# Phase 8 전문가: 독서 목표 트래킹

## 역할

이 에이전트는 북 리뷰 사이트의 **독서 목표 트래킹**을 담당하는 전문가다.
환경변수로 연간 목표 권수를 설정하고, 홈 화면에 달성률 진행률 바를 표시한다.
추가 API 호출 없이 기존 데이터로 계산한다.

## 프로젝트 핵심 규칙

- 모든 페이지는 `src/app/[locale]/` 하위에 위치
- 언어 파일 수정 시 `ko.json`과 `en.json` 동시 업데이트 필수
- Notion API 호출은 서버 컴포넌트에서만
- `NEXT_PUBLIC_` 접두어가 있는 환경변수만 클라이언트에서 접근 가능

## 구현 목표

홈 화면에 "올해 N권 / 목표 M권 (X%)" 진행률 바를 추가한다.
별도 DB 없이 기존 `getBooks()` 데이터로 올해 완독 수를 계산한다.

## 작업 순서

### 1. 환경변수 추가

`.env` 파일에 추가:
```env
NEXT_PUBLIC_YEARLY_GOAL=50
```

### 2. ReadingGoal 서버 컴포넌트 생성

`src/components/ReadingGoal.tsx` 생성 (서버 컴포넌트, async):

```tsx
import { getTranslations } from 'next-intl/server';

interface ReadingGoalProps {
  currentCount: number;
  locale: string;
}

export async function ReadingGoal({ currentCount, locale }: ReadingGoalProps) {
  const t = await getTranslations({ locale, namespace: 'home' });
  const goal = Number(process.env.NEXT_PUBLIC_YEARLY_GOAL ?? 0);

  if (!goal) return null;

  const percent = Math.min(Math.round((currentCount / goal) * 100), 100);
  const achieved = currentCount >= goal;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground">
          {t('goal', { current: currentCount, total: goal })}
        </span>
        <span className={achieved ? 'text-green-500 font-semibold' : 'text-muted-foreground'}>
          {percent}%{achieved && ' ✓'}
        </span>
      </div>
      <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all ${achieved ? 'bg-green-500' : 'bg-primary'}`}
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
```

### 3. 홈 페이지에 ReadingGoal 추가

`src/app/[locale]/page.tsx`에서 올해 완독 수를 계산하고 `ReadingGoal` 컴포넌트 추가:

올해 완독 수 계산 방법:
```typescript
const currentYear = new Date().getFullYear().toString();
const yearlyCount = books.filter(
  (b) => b.status === '완독' && b.readDate?.startsWith(currentYear)
).length;
```

연간 독서량 요약 영역에 `<ReadingGoal>` 삽입:
```tsx
<ReadingGoal currentCount={yearlyCount} locale={locale} />
```

### 4. 번역 키 추가

`src/messages/ko.json`의 `home` 섹션:
```json
"goal": "올해 {current}권 / 목표 {total}권"
```

`src/messages/en.json`의 `home` 섹션:
```json
"goal": "{current} books this year / Goal: {total}"
```

## 완료 기준

- [ ] 홈 화면에 진행률 바와 "올해 N권 / 목표 M권 (X%)" 텍스트 표시
- [ ] `NEXT_PUBLIC_YEARLY_GOAL` 값 변경 시 즉시 반영
- [ ] 목표 달성 시(N ≥ M) 초록색으로 변경 + "✓" 표시
- [ ] ko.json / en.json 동시 업데이트
- [ ] TypeScript 오류 없음 (`npx tsc --noEmit` 통과)
