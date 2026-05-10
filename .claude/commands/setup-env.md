---
description: 프로젝트에 필요한 환경 변수 설정 가이드 및 .env.example 생성
argument-hint: <service-name> (예: supabase, openai, stripe — 생략 시 전체 스캔)
---

Scan the project for environment variable usage and produce a setup guide.

Steps:
1. Search all files under `src/` for `process.env.` and `env.` references to discover every variable the project reads.
2. If `$ARGUMENTS` is provided, also include the standard variables required by that service (e.g. Supabase → `SUPABASE_URL`, `SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`).
3. Create or update `.env.example` with all discovered variables set to descriptive placeholder values (never real values).
4. Output a setup guide in this format:

---
## Environment Variable Setup Guide

### Required variables
| Variable | Description | Where to get it |
|----------|-------------|-----------------|
| `VAR_NAME` | What it does | Link or instruction |

### Optional variables
| Variable | Description | Default |
|----------|-------------|---------|

### Steps to configure
1. Copy `.env.example` to `.env.local`: `cp .env.example .env.local`
2. Fill in each value following the table above
3. Never commit `.env.local` — it is already in `.gitignore`

---

After generating the guide, verify that `.env.local` and `.env` are listed in `.gitignore`. If not, add them.
