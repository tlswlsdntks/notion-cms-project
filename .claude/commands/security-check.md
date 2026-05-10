---
description: 현재 브랜치의 변경 파일을 대상으로 보안 취약점 체크
argument-hint: <file-or-directory> (생략 시 전체 src/ 검사)
---

Perform a security review of `$ARGUMENTS` (default to `src/` if no argument given).

Check for the following vulnerability categories. For each finding, include severity (Critical / High / Medium / Low), file:line, description, and a concrete fix.

**Categories to check:**

1. **Injection** — SQL injection, command injection, template injection. Look for string concatenation in queries or `exec`/`eval` usage.

2. **XSS** — use of `dangerouslySetInnerHTML` without sanitization, unescaped user input rendered directly.

3. **Sensitive data exposure** — hardcoded secrets, API keys, passwords in source files. Environment variable names logged to console.

4. **Insecure API routes** — missing input validation, no rate limiting comment, returning stack traces in error responses.

5. **Authentication gaps** — protected routes or API handlers missing auth checks. Server components fetching private data without verifying session.

6. **Dependency risks** — check `package.json` for packages with known CVEs (flag any that appear obviously outdated or risky).

7. **CORS / headers** — missing or overly permissive `next.config` headers configuration.

8. **Path traversal** — user-controlled values used in file path operations.

Output format:
- Group findings by severity (Critical first)
- End with a pass/fail verdict and a prioritized fix list
- If no issues found in a category, write "✓ No issues found"
