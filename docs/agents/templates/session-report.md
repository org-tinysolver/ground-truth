# Session Report Template

세션 완료 기록용 템플릿입니다.

## 파일 위치

```
reports/sessions/YYYY-MM-DD-{slug}.md
```

**slug 작성 규칙:**
- 영문 소문자, 하이픈 사용
- 작업 내용을 2-4 단어로 요약
- 예: `hook-script-patch`, `login-feature`, `bug-fix-api`

---

## 기본 템플릿

```markdown
---
status: closed
date: YYYY-MM-DD
project: "project-name"
---

# {세션 제목}

## 요약
{1-2문장으로 무엇을 했는지}

## 상세 내용

### 문제/요청
{원래 문제 또는 요청}

### 해결 방법
{어떻게 해결했는지}

### 변경 사항
| 대상 | 변경 내용 |
|------|----------|
| {파일/설정} | {변경 내용} |

## 결과
{완료된 결과}

## 관련 링크
- PR: (있으면)
- 참고: (있으면)
```

---

## 미완결 템플릿 (Open)

```markdown
---
status: open
date: YYYY-MM-DD
project: "project-name"
issue: "#123"
---

# {세션 제목}

## 요약
{1-2문장으로 무엇을 했는지}

## 완료된 작업
- [x] {완료된 작업 1}
- [x] {완료된 작업 2}

## 남은 작업
- [ ] {남은 작업 1}
- [ ] {남은 작업 2}

## 현재 상태
{어디까지 진행되었는지}

## 이어서 작업 시 참고
{다음에 작업할 때 알아야 할 컨텍스트}

## 관련 링크
- Issue: #{issue-number}
- PR: (있으면)
```

---

## Status 설명

| Status | 의미 | Slack 알림 |
|--------|------|-----------|
| `closed` | 완전히 해결됨 | ✅ 완료 |
| `open` | 미완결, 이어서 해야 함 | 🔄 진행 중 |

---

## 예시: Closed

```markdown
---
status: closed
date: 2025-12-14
project: "ai-pm"
---

# Hook Script 패치

## 요약
ai-devteam, ai-research에 hook script 수정사항 패치 및 배포

## 상세 내용

### 문제/요청
ai-pm에서 수정한 worktree hook script가 다른 팀에 전달되지 않음

### 해결 방법
ai-pm의 check-branch.sh 변경사항을 ai-devteam, ai-research에 복사

### 변경 사항
| 대상 | 변경 내용 |
|------|----------|
| ai-devteam/scripts/claude-code/check-branch.sh | git/gh 읽기 명령어 허용 규칙 추가 |
| ai-research/scripts/claude-code/check-branch.sh | git/gh 읽기 명령어 허용 규칙 추가 |

## 결과
두 레포지토리 모두 main 브랜치에서 git/gh 읽기 명령어 사용 가능

## 관련 링크
- ai-devteam commit: bd6ab81
- ai-research commit: 8e192cc
```

---

## 예시: Open

```markdown
---
status: open
date: 2025-12-14
project: "tinysolver-me"
issue: "#45"
---

# 로그인 페이지 개선

## 요약
로그인 페이지 UI 개선 작업 진행 중

## 완료된 작업
- [x] 디자인 시안 확정
- [x] 컴포넌트 구조 설계

## 남은 작업
- [ ] LoginForm 컴포넌트 구현
- [ ] API 연동
- [ ] 테스트 작성

## 현재 상태
디자인/설계 완료, 구현 시작 전

## 이어서 작업 시 참고
- Figma 시안: [링크]
- API 엔드포인트: POST /api/auth/login
- 사용할 라이브러리: react-hook-form, zod

## 관련 링크
- Issue: #45
```

---

## Frontmatter 필드

| 필드 | 필수 | 설명 |
|------|------|------|
| `status` | ✅ | `closed` 또는 `open` |
| `date` | ✅ | 세션 날짜 (YYYY-MM-DD) |
| `project` | ❌ | 관련 프로젝트명 |
| `issue` | ❌ | 연동된 GitHub Issue (open일 때 필수) |
