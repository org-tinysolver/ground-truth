# Workqueue ↔ GitHub Issue 동기화

## 메타
- **유형**: `infra`
- **상태**: `대기`
- **우선순위**: `🟡 중간`
- **담당자**: AI Agent
- **작성일**: 2024-12-22
- **의존**: `1-team-repo-setup.md` 완료 후

## Why (목적)
> workqueue 파일과 GitHub issue를 동기화하여 가시성 확보

- 팀 내부: workqueue 파일로 작업
- 외부/Human: GitHub issue로 트래킹
- 양방향 동기화로 일관성 유지

## What (무엇)
> 동기화 자동화 구현

- [ ] workqueue 변경 감지 GitHub Action
- [ ] 파일 → issue 생성/업데이트 스크립트
- [ ] issue 상태 변경 → 파일 이동 (webhook 또는 action)
- [ ] 라벨 자동 설정 (team:*, handoff:*, 상태)

## How (방법)
> GitHub Actions + 스크립트

### 1. 파일 → Issue 동기화
```yaml
# .github/workflows/workqueue-to-issue.yml
on:
  push:
    paths:
      - 'workqueue/inbox/**'
      - 'workqueue/in-progress/**'
      - 'workqueue/blocked/**'

jobs:
  sync:
    steps:
      - name: Parse workqueue file
      - name: Create/Update GitHub issue
```

### 2. Issue → 파일 동기화
```yaml
# .github/workflows/issue-to-workqueue.yml
on:
  issues:
    types: [opened, closed, labeled]

jobs:
  sync:
    steps:
      - name: Parse issue
      - name: Move/Update workqueue file
```

### 3. 수동 커맨드 (fallback)
```bash
# 이슈 생성
/issue to-dev "제목"

# 상태 변경
/workqueue move inbox in-progress feature-auth.md
```

## Why This Way (선택 이유)
> 양방향 동기화 + 수동 fallback

- **자동화 우선**: 가능한 자동 동기화
- **수동 fallback**: 자동화 실패 시 커맨드로 보완
- **GitHub 중심**: issue가 공식 기록, 파일은 작업용

## 참고
- org-rules 라벨 규칙: `docs/agents/org-rules.mdx`
- workqueue 표준: `docs/agents/teams/workqueue-standard.mdx`
