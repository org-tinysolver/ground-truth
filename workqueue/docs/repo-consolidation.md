# 각 AI 팀 레포 → Ground Truth 통합

- **상태**: 대기
- **우선순위**: 🔴 높음
- **담당**: AI PM / AI Dev

## Why (목적)

각 AI 팀 레포(ai-pm, ai-devteam, ai-research)의 정책/기준 문서를 Ground Truth로 통합하여:
- 단일 Source of Truth 확보
- 각 레포는 작업 관리 용도로만 사용
- 중복 문서 제거

## What (목표)

### 1. 각 레포에서 가져올 것

| 레포 | 가져올 내용 | Ground Truth 위치 |
|------|------------|------------------|
| ai-pm | `agent-docs/rules/*` | `docs/agents/teams/ai-pm/rules/` |
| ai-pm | `agent-docs/schemas/*` | `docs/agents/teams/ai-pm/schemas/` |
| ai-pm | `.claude/commands/*` | 참조 문서화 |
| ai-pm | `.claude/skills/*` | 참조 문서화 |
| ai-devteam | `agent-docs/rules/*` | `docs/agents/teams/ai-dev/rules/` |
| ai-devteam | `boilerplates/` 구조 | 참조 문서화 |
| ai-research | `agent-docs/rules/*` | `docs/agents/teams/ai-research/rules/` |
| ai-research | `outputs/` 유형 정의 | 참조 문서화 |

### 2. 각 레포에 남길 것

```
{repo}/
├── .claude/           # Commands & Skills (로컬 실행용)
├── agent-docs/        # Ground Truth 참조 링크만
├── workqueue/         # 작업 관리 (로컬 캐시)
├── outputs/           # 결과물 (ai-research만)
├── CLAUDE.md          # Ground Truth 참조하도록 수정
└── ...                # 실제 코드/작업물
```

### 3. CLAUDE.md 수정

각 레포의 CLAUDE.md가 Ground Truth를 참조하도록:

```markdown
# CLAUDE.md - AI {팀}

> 정책/기준 문서: https://org-tinysolver.github.io/ground-truth/agents/teams/ai-{팀}

## 이 레포의 역할
- 작업 관리 (GitHub Issues)
- 로컬 캐시 (workqueue)
- 실행 도구 (.claude/)

## 상세 규칙
Ground Truth 참조: [AI {팀} 문서](링크)
```

## How (방법)

### 사전 조건
- [ ] git clone 접근 권한 확보 (gh auth 또는 SSH)

### 작업 순서

1. **각 레포 clone**
   ```bash
   gh repo clone org-tinysolver/ai-pm
   gh repo clone org-tinysolver/ai-devteam
   gh repo clone org-tinysolver/ai-research
   ```

2. **agent-docs 내용 분석 및 이관**
   - 각 레포의 `agent-docs/rules/*.md` 읽기
   - Ground Truth에 해당 내용 반영
   - 중복 제거 및 정리

3. **각 레포 CLAUDE.md 수정**
   - Ground Truth 참조하도록 변경
   - 로컬 실행에 필요한 내용만 유지

4. **Ground Truth 빌드 테스트**
   ```bash
   npm run build
   ```

5. **각 레포에 PR 생성**

## Why This Way (이유)

- Ground Truth = 정책의 Source of Truth
- 각 레포 = 작업 실행 공간
- GitHub Issues = 팀 간 소통 채널
- 중복 문서 방지 → 일관성 유지

## 완료 조건

- [ ] ai-pm agent-docs → Ground Truth 이관
- [ ] ai-devteam agent-docs → Ground Truth 이관
- [ ] ai-research agent-docs → Ground Truth 이관
- [ ] 각 레포 CLAUDE.md가 Ground Truth 참조
- [ ] Ground Truth 빌드 성공
- [ ] 각 레포 PR 머지
