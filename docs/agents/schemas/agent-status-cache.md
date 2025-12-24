# Agent 상태 캐시 스키마 (Agent Status Cache)

각 실행 Agent(ai-devteam, ai-research)가 로컬에서 관리하는 상태 파일 스키마입니다.

---

## 목적

1. **세션 연속성**: Agent가 새 세션을 시작할 때 이전 작업 상태 빠르게 파악
2. **GitHub 동기화 최소화**: 매번 GitHub API 호출 없이 로컬 캐시로 빠른 확인
3. **작업 추적**: 오늘 완료한 작업, 진행 중인 작업 기록

---

## 파일 위치

```
ai-devteam/.agent/status.yaml      # DevTeam 상태
ai-research/.agent/status.yaml     # Research 상태
```

---

## 스키마 정의

```yaml
# .agent/status.yaml

# 메타 정보
meta:
  agent_id: "ai-devteam"  # ai-devteam | ai-research
  last_sync: "2025-12-13T10:00:00+09:00"
  last_session_id: "session-20251213-001"

# 현재 진행 중인 작업 (1개만)
current_task:
  issue_number: 123
  repo: "org-tinysolver/tinysolver.me"
  title: "Hero 섹션 타이틀 변경"
  url: "https://github.com/org-tinysolver/tinysolver.me/issues/123"
  status: "in_progress"  # pending | in_progress | blocked
  priority: "P2"
  started_at: "2025-12-13T10:05:00+09:00"
  branch: "feat/hero-title-update"
  estimated_minutes: 10
  elapsed_minutes: 15
  notes: "작업 중 - 스타일 조정 추가 필요"

# 대기 중인 작업 목록 (우선순위 순)
pending_tasks:
  - issue_number: 124
    repo: "org-tinysolver/tinysolver.me"
    title: "Footer 추가"
    url: "https://github.com/org-tinysolver/tinysolver.me/issues/124"
    priority: "P2"
    labels: ["ready-for-dev", "parallel"]
    created_at: "2025-12-13T09:00:00+09:00"
    depends_on: []  # 의존성 없음

  - issue_number: 125
    repo: "org-tinysolver/tinysolver.me"
    title: "About 섹션"
    url: "https://github.com/org-tinysolver/tinysolver.me/issues/125"
    priority: "P3"
    labels: ["ready-for-dev", "parallel"]
    created_at: "2025-12-13T09:30:00+09:00"
    depends_on: []

# 블로커 발생 작업
blocked_tasks:
  - issue_number: 126
    repo: "org-tinysolver/tinysolver.me"
    title: "API 연동"
    blocked_reason: "Issue #120 선행 작업 필요"
    blocked_at: "2025-12-13T08:00:00+09:00"
    depends_on: [120]

# 오늘 완료한 작업
completed_today:
  - issue_number: 122
    repo: "org-tinysolver/tinysolver.me"
    title: "버그 수정"
    completed_at: "2025-12-13T09:30:00+09:00"
    pr_number: 45
    pr_url: "https://github.com/org-tinysolver/tinysolver.me/pull/45"
    actual_minutes: 8

# 통계
stats:
  today:
    completed_count: 1
    total_minutes: 8
  this_week:
    completed_count: 5
    total_minutes: 120
```

---

## 상태 전이

```
null (초기 상태)
    │
    │ GitHub에서 Issue 가져옴
    ▼
pending_tasks에 추가
    │
    │ 작업 시작
    ▼
current_task로 이동 (status: in_progress)
    │
    ├─── 완료 ──────────► completed_today로 이동
    │
    └─── 블로커 ────────► blocked_tasks로 이동
                            │
                            │ 해결됨
                            ▼
                        pending_tasks로 복귀
```

---

## Agent 시작 시 체크 로직

```python
def agent_startup():
    # 1. 로컬 캐시 로드
    status = load_yaml(".agent/status.yaml")

    # 2. 진행 중 작업 확인
    if status.current_task:
        print(f"이전 작업 진행 중: {status.current_task.title}")
        # 이어서 작업할지 확인

    # 3. GitHub 동기화 (캐시와 비교)
    remote_issues = fetch_github_issues(label="ready-for-*")

    # 4. 새로운 Issue 있으면 pending_tasks에 추가
    for issue in remote_issues:
        if issue not in status.pending_tasks:
            status.pending_tasks.append(issue)

    # 5. 우선순위 정렬
    status.pending_tasks.sort(key=lambda x: x.priority)

    # 6. 캐시 저장
    save_yaml(status, ".agent/status.yaml")

    return status
```

---

## GitHub 동기화 명령어

### 캐시 → GitHub 업데이트

```bash
# 현재 작업 시작 알림
gh issue edit $ISSUE_NUMBER -R $REPO \
  --remove-label "ready-for-dev" \
  --add-label "in-progress"

# 작업 완료 알림
gh issue edit $ISSUE_NUMBER -R $REPO \
  --remove-label "in-progress" \
  --add-label "needs-review"
```

### GitHub → 캐시 동기화

```bash
# 새로운 ready-for-* Issue 가져오기
gh issue list -R org-tinysolver/tinysolver.me \
  --label "ready-for-dev" \
  --state open \
  --json number,title,labels,createdAt,url
```

---

## 예시: ai-devteam 상태 파일

```yaml
# ai-devteam/.agent/status.yaml

meta:
  agent_id: "ai-devteam"
  last_sync: "2025-12-13T14:00:00+09:00"
  last_session_id: "session-20251213-003"

current_task:
  issue_number: 130
  repo: "org-tinysolver/tinysolver.me"
  title: "Contact 폼 추가"
  url: "https://github.com/org-tinysolver/tinysolver.me/issues/130"
  status: "in_progress"
  priority: "P1"
  started_at: "2025-12-13T14:05:00+09:00"
  branch: "feat/contact-form"
  estimated_minutes: 25
  elapsed_minutes: 10

pending_tasks:
  - issue_number: 131
    repo: "org-tinysolver/tinysolver.me"
    title: "SEO 메타태그 추가"
    priority: "P2"
    labels: ["ready-for-dev"]

blocked_tasks: []

completed_today:
  - issue_number: 128
    title: "Hero 타이틀 변경"
    completed_at: "2025-12-13T11:00:00+09:00"
    pr_number: 50
    actual_minutes: 12
  - issue_number: 129
    title: "Footer 연락처 추가"
    completed_at: "2025-12-13T13:30:00+09:00"
    pr_number: 51
    actual_minutes: 18

stats:
  today:
    completed_count: 2
    total_minutes: 30
```

---

## 예시: ai-research 상태 파일

```yaml
# ai-research/.agent/status.yaml

meta:
  agent_id: "ai-research"
  last_sync: "2025-12-13T14:00:00+09:00"
  last_session_id: "session-20251213-002"

current_task:
  issue_number: 15
  repo: "org-tinysolver/ai-research"
  title: "Remix vs Next.js 비교 분석"
  url: "https://github.com/org-tinysolver/ai-research/issues/15"
  status: "in_progress"
  priority: "P2"
  started_at: "2025-12-13T14:10:00+09:00"
  output_file: "research/systems/remix_vs_nextjs_COMPARISON.md"
  estimated_minutes: 30
  elapsed_minutes: 5

pending_tasks:
  - issue_number: 16
    repo: "org-tinysolver/ai-research"
    title: "Cloudflare Workers vs Vercel Edge 비교"
    priority: "P3"

blocked_tasks: []

completed_today:
  - issue_number: 14
    title: "AI 코딩 도구 비교"
    completed_at: "2025-12-13T13:00:00+09:00"
    output_file: "research/ai-tools/coding_tools_COMPARISON.md"
    actual_minutes: 28

stats:
  today:
    completed_count: 1
    total_minutes: 28
```

---

## .gitignore 설정

```gitignore
# Agent 상태 캐시 (로컬 전용, 커밋하지 않음 - 선택적)
# .agent/status.yaml

# 또는 커밋해서 상태 공유 가능 (팀 협업 시)
```

---

## Quick Reference

```bash
# 상태 파일 위치
ai-devteam/.agent/status.yaml
ai-research/.agent/status.yaml

# Agent 시작 시
1. status.yaml 읽기
2. current_task 있으면 이어서 작업
3. 없으면 pending_tasks[0] 시작
4. GitHub 동기화로 새 Issue 확인

# 작업 완료 시
1. current_task → completed_today로 이동
2. pending_tasks[0] → current_task로 이동
3. GitHub Issue 라벨 업데이트
4. status.yaml 저장
```
