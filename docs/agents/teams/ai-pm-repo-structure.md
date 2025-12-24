# AI-PM 레포지토리 구조

## 개요

`ai-pm` 레포는 PM Agent의 **작업 컨텍스트 및 메모리** 역할을 합니다.
정적 문서는 `ground-truth`에, 동적 작업 데이터는 `ai-pm`에 저장됩니다.

## 역할 분리

| 레포 | 역할 | 내용 |
|------|------|------|
| `ground-truth` | Source of Truth | 규칙, 스키마, 가이드, 정책 (정적) |
| `ai-pm` | Working Memory | 작업 큐, 컨텍스트, 회의록, 보고서 (동적) |

## ai-pm 폴더 구조

```
ai-pm/
├── workqueue/           # 작업 큐 (inbox, in-progress, blocked, done)
├── context/             # 현재 컨텍스트
│   ├── current-focus/   # 현재 집중 작업
│   ├── decisions/       # 결정 사항
│   └── handoffs/        # 핸드오프 기록
├── objectives/          # OKR 관리
├── meetings/            # 회의록
├── reports/             # 보고서
├── delegations/         # 위임 기록
├── blockers/            # 블로커 목록
├── hitl/                # HITL 이슈
├── .claude/             # Claude Code 설정
│   ├── commands/        # 슬래시 커맨드
│   ├── skills/          # 스킬
│   └── settings.json    # 설정
└── scripts/             # 스크립트
```

## 컨텍스트 흐름

1. **작업 시작**: `workqueue/inbox/` → `workqueue/in-progress/`
2. **컨텍스트 기록**: `context/current-focus/`에 현재 작업 상태
3. **결정 기록**: `context/decisions/`에 중요 결정
4. **완료/핸드오프**: `workqueue/done/` 또는 `context/handoffs/`

## 참조 방식

PM Agent는 작업 시:
1. `ground-truth` 문서 참조 (규칙, 가이드)
2. `ai-pm` 컨텍스트 확인 (현재 상태, 이전 결정)
3. 작업 결과를 `ai-pm`에 기록

## 관련 문서

- [팀 레포 구조](/docs/agents/teams/repo-structure)
- [Workqueue 표준](/docs/agents/teams/workqueue-standard)
- [Agent 컨텍스트](/docs/agents/teams/agent-context)
