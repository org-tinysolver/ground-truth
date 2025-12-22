# 팀 Repo 구조 설정

## 메타
- **유형**: `infra`
- **상태**: `대기`
- **우선순위**: `🔴 높음`
- **담당자**: AI Agent (각 repo에서)
- **작성일**: 2024-12-22

## Why (목적)
> 각 AI 팀이 독립적으로 작업할 수 있는 컨텍스트 환경 구축

각 팀 repo가 AI agent의 warm up/setup/context 관리 역할을 하도록 구조화.
문서는 ground-truth로, 작업 컨텍스트는 팀 repo로 분리.

## What (무엇)
> 3개 팀 repo 설정

### ai-pm repo
- [ ] 기존 문서 → ground-truth로 이동
- [ ] workqueue/ 구조 생성 (inbox, in-progress, blocked, done)
- [ ] context/ 구조 생성 (current-focus, decisions, handoffs)
- [ ] CLAUDE.md 작성 (PM agent 컨텍스트)
- [ ] .claude/skills, commands 설정

### ai-devteam repo
- [ ] 기존 문서 → ground-truth로 이동
- [ ] workqueue/ 구조 생성
- [ ] context/ 구조 생성
- [ ] CLAUDE.md 작성 (Dev agent 컨텍스트)
- [ ] .claude/skills, commands 설정

### ai-research repo
- [ ] 기존 문서 → ground-truth로 이동
- [ ] workqueue/ 구조 생성
- [ ] context/ 구조 생성
- [ ] CLAUDE.md 작성 (Research agent 컨텍스트)
- [ ] .claude/skills, commands 설정

## How (방법)
> 각 repo에서 Claude 세션으로 작업

1. 해당 repo에서 새 Claude 세션 시작
2. ground-truth의 표준 문서 참조:
   - `docs/agents/teams/repo-structure.mdx`
   - `docs/agents/teams/workqueue-standard.mdx`
   - `docs/agents/teams/agent-context.mdx`
3. 표준에 맞게 구조 생성
4. 기존 문서는 ground-truth PR로 이동

## Why This Way (선택 이유)
> 관심사 분리 + Agent 연속성

- **문서 ↔ 컨텍스트 분리**: ground-truth는 정적 문서, 팀 repo는 동적 컨텍스트
- **Agent 독립성**: 각 팀 Agent가 자신의 repo에서 바로 시작 가능
- **세션 연속성**: session-logs로 Agent 간 컨텍스트 전달

## 참고
- ground-truth 문서: https://org-tinysolver.github.io/ground-truth/
- 표준 구조: `docs/agents/teams/repo-structure`
