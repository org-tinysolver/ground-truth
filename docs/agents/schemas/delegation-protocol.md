# Agent 위임 프로토콜 (Delegation Protocol)

AI PM과 실행 Agent(ai-devteam, ai-research) 간의 통신 규약입니다.

---

## 전체 흐름

```
┌─────────────────────────────────────────────────────────────────────────┐
│                              AI PM                                       │
│                                                                         │
│  1. 사용자 요청 수신                                                     │
│  2. 요청 구체화 (30분 룰, Task Group 분할)                               │
│  3. GitHub Issue 생성 (Self-Contained)                                  │
│  4. GitHub Project Board에 추가                                          │
│  5. Issue에 `ready-for-dev` 또는 `ready-for-research` 라벨              │
│                                                                         │
└─────────────────────────────┬───────────────────────────────────────────┘
                              │
                              │ GitHub Issue/Project가 "위임 신호"
                              ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                     ai-devteam / ai-research                             │
│                                                                         │
│  1. 시작 시 로컬 상태 캐시 확인 (.agent/status.yaml)                     │
│  2. GitHub에서 자신의 Issue 조회 (ready-for-* 라벨)                      │
│  3. 작업 수행                                                            │
│  4. 완료 시 Issue 업데이트, 로컬 캐시 갱신                               │
│  5. 다음 Issue로 이동                                                    │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## 1. PM → Agent 위임 (Issue 기반)

### Issue 생성 규칙

```bash
# ai-devteam 위임
gh issue create -R org-tinysolver/tinysolver.me \
  --title "[DEV] Hero 섹션 타이틀 변경" \
  --body "$(cat <<'EOF'
## 이 Issue에서 해야 할 것
Hero 섹션의 타이틀을 변경

## 수정할 파일
| 파일 | 변경 내용 |
|------|----------|
| `app/components/Hero.tsx` | h1 텍스트 변경 |

## 구체적인 변경 사항

**현재:**
```tsx
<h1>Hello World</h1>
```

**변경 후:**
```tsx
<h1>Welcome to TinySolver</h1>
```

## 완료 조건
- [ ] 타이틀 변경됨
- [ ] 빌드 성공
- [ ] Preview 배포 확인

## 메타
| 항목 | 값 |
|------|---|
| 예상 소요 | 10분 |
| 우선순위 | P2 |
| 위임 대상 | ai-devteam |
EOF
)" \
  --label "ai-pm,ready-for-dev,P2"
```

```bash
# ai-research 위임
gh issue create -R org-tinysolver/ai-research \
  --title "[RESEARCH] Remix vs Next.js 비교 분석" \
  --body "$(cat <<'EOF'
## 리서치 목표
Remix와 Next.js의 SSR 성능 및 DX 비교

## 분석 항목
- [ ] 초기 로딩 성능
- [ ] 라우팅 방식
- [ ] 데이터 페칭 패턴
- [ ] Cloudflare 호환성

## 산출물
`research/systems/remix_vs_nextjs_COMPARISON.md`

## 완료 조건
- [ ] 비교 리포트 작성 완료
- [ ] 결론 및 권장사항 포함

## 메타
| 항목 | 값 |
|------|---|
| 예상 소요 | 30분 |
| 우선순위 | P2 |
| 위임 대상 | ai-research |
EOF
)" \
  --label "ai-pm,ready-for-research,P2"
```

### 위임 라벨 체계

| 라벨 | 의미 | 대상 Agent |
|------|------|-----------|
| `ready-for-dev` | 개발 작업 대기 | ai-devteam |
| `ready-for-research` | 리서치 작업 대기 | ai-research |
| `in-progress` | 작업 중 | - |
| `needs-review` | HITL 리뷰 필요 | Human |
| `blocked` | 선행 작업 대기 | - |
| `done` | 완료 | - |

### Project Board 추가

```bash
# Project 번호 확인
gh project list --owner org-tinysolver

# Issue를 Project에 추가
gh project item-add <PROJECT_NUMBER> \
  --owner org-tinysolver \
  --url https://github.com/org-tinysolver/tinysolver.me/issues/123
```

---

## 2. Agent 시작 프로토콜

Agent(ai-devteam, ai-research)가 세션 시작 시 실행하는 절차입니다.

### Step 1: 로컬 상태 캐시 확인

각 Agent 레포 루트에 `.agent/status.yaml` 파일로 상태 관리:

```yaml
# .agent/status.yaml
last_sync: "2025-12-13T10:00:00+09:00"
current_task:
  issue_number: 123
  repo: "org-tinysolver/tinysolver.me"
  title: "Hero 섹션 타이틀 변경"
  status: "in_progress"  # pending | in_progress | blocked | completed
  started_at: "2025-12-13T10:05:00+09:00"
  branch: "feat/hero-title-update"

pending_tasks:
  - issue_number: 124
    repo: "org-tinysolver/tinysolver.me"
    title: "Footer 추가"
    priority: "P2"
  - issue_number: 125
    repo: "org-tinysolver/tinysolver.me"
    title: "About 섹션"
    priority: "P3"

completed_today:
  - issue_number: 122
    title: "버그 수정"
    completed_at: "2025-12-13T09:30:00+09:00"
    pr_number: 45
```

### Step 2: GitHub 동기화

```bash
# 자신에게 할당된 ready-for-* Issue 조회
gh issue list -R org-tinysolver/tinysolver.me \
  --label "ready-for-dev" \
  --state open \
  --json number,title,labels,createdAt

# ai-research의 경우
gh issue list -R org-tinysolver/ai-research \
  --label "ready-for-research" \
  --state open \
  --json number,title,labels,createdAt
```

### Step 3: 작업 시작

```bash
# Issue 라벨 변경: ready-for-dev → in-progress
gh issue edit 123 -R org-tinysolver/tinysolver.me \
  --remove-label "ready-for-dev" \
  --add-label "in-progress"
```

### Step 4: 로컬 캐시 업데이트

`.agent/status.yaml` 갱신 후 커밋 (선택적)

---

## 3. Agent 작업 완료 프로토콜

### Step 1: PR 생성 (ai-devteam)

```bash
gh pr create -R org-tinysolver/tinysolver.me \
  --title "feat: Hero 타이틀 변경 (#123)" \
  --body "$(cat <<'EOF'
## Summary
- Hero 섹션 타이틀 변경

## Related Issue
Closes #123

## Changes
- `app/components/Hero.tsx`: 타이틀 텍스트 수정

## Preview
https://xxx.tinysolver-me.pages.dev

---
🤖 Generated by ai-devteam
EOF
)"
```

### Step 2: Issue 상태 업데이트

```bash
# 완료 라벨로 변경
gh issue edit 123 -R org-tinysolver/tinysolver.me \
  --remove-label "in-progress" \
  --add-label "needs-review"

# 완료 코멘트 추가
gh issue comment 123 -R org-tinysolver/tinysolver.me \
  --body "$(cat <<'EOF'
## 작업 완료 보고

**Status**: ✅ Done
**PR**: #456
**Preview**: https://xxx.pages.dev

### 변경 사항
- Hero 타이틀 변경 완료

### HITL 확인 필요
- [ ] Preview에서 변경 확인
- [ ] PR 승인 및 머지

---
🤖 ai-devteam
EOF
)"
```

### Step 3: 로컬 캐시 갱신

```yaml
# .agent/status.yaml 업데이트
current_task: null
completed_today:
  - issue_number: 123
    title: "Hero 섹션 타이틀 변경"
    completed_at: "2025-12-13T10:30:00+09:00"
    pr_number: 456
```

### Step 4: 다음 작업 확인

```bash
# 다음 ready-for-* Issue 조회
gh issue list -R org-tinysolver/tinysolver.me \
  --label "ready-for-dev" \
  --state open \
  --limit 1
```

---

## 4. 상태 조회 (PM 관점)

### 전체 현황 확인

```bash
# 모든 in-progress Issue
gh issue list -R org-tinysolver/tinysolver.me \
  --label "in-progress" \
  --json number,title,assignees

# 모든 ready-for-* Issue (대기 중)
gh issue list -R org-tinysolver/tinysolver.me \
  --label "ready-for-dev" \
  --json number,title,createdAt

# needs-review (HITL 대기)
gh issue list -R org-tinysolver/tinysolver.me \
  --label "needs-review" \
  --json number,title
```

### Project Board 확인

```bash
gh project item-list <PROJECT_NUMBER> --owner org-tinysolver \
  --format json
```

---

## 5. 라벨 상태 전이

```
[PM 생성]
    │
    ▼
ready-for-dev / ready-for-research
    │
    │ Agent가 작업 시작
    ▼
in-progress
    │
    ├─── 완료 ──────────► needs-review ──► done
    │                          │
    │                          │ HITL 피드백
    │                          ▼
    └─── 블로커 발생 ───► blocked
                            │
                            │ 해결됨
                            ▼
                      ready-for-*
```

---

## 6. 에러 핸들링

### Agent 블로커 발생 시

```bash
# 라벨 변경
gh issue edit 123 -R org-tinysolver/tinysolver.me \
  --remove-label "in-progress" \
  --add-label "blocked"

# 블로커 코멘트
gh issue comment 123 -R org-tinysolver/tinysolver.me \
  --body "$(cat <<'EOF'
## 🚫 Blocked

**Reason**: API 엔드포인트 미구현

### 필요한 것
- Issue #120 선행 작업 완료 필요

### PM Action Required
- [ ] 선행 작업 확인
- [ ] 의존성 정리 후 재위임

---
🤖 ai-devteam
EOF
)"
```

### 30분 초과 시

```bash
gh issue comment 123 -R org-tinysolver/tinysolver.me \
  --body "$(cat <<'EOF'
## ⏰ Timeout Warning

**경과 시간**: 35분
**예상 시간**: 10분

### 상황
작업 범위가 예상보다 큼

### 제안
- 이 Issue를 2-3개로 분할 권장
- 또는 계속 진행 허용

### PM Decision Required
- [ ] 계속 진행
- [ ] Issue 분할

---
🤖 ai-devteam
EOF
)"
```

---

## Quick Reference

```bash
# PM: Issue 생성 후 위임
gh issue create ... --label "ready-for-dev"

# Agent: 작업 시작
gh issue edit N --remove-label "ready-for-dev" --add-label "in-progress"

# Agent: 작업 완료
gh issue edit N --remove-label "in-progress" --add-label "needs-review"

# Human: 승인 후
gh issue edit N --remove-label "needs-review" --add-label "done"
gh issue close N
```
