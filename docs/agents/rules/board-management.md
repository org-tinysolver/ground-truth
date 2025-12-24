# GitHub Projects 보드 관리 규칙

> **적용 시점**: 이슈 생성, 프로젝트 생성, 보드 현황 조회 시

## 근거

- human-docs/standards/github-projects-structure.md

---

## 보드 명명 규칙

### 접두사 체계

```
[유형] 보드명
```

| 접두사 | 용도 | 특징 |
|--------|------|------|
| `[TEAM]` | 팀 자율 운영 | AI Agent 자율 동작, 팀 내부 작업 |
| `[PRODUCT]` | 제품/서비스 | 장기 운영, 지속적 유지보수 |
| `[TF]` | Task Force | 한시적, 특정 문제 해결, 워룸 형태 |
| `[HITL]` | Human-in-the-Loop | 인간 판단 필요, 블로커 이슈, 권한 확대 기반 |

### 현재 보드 목록

| # | 보드명 | 유형 |
|---|--------|------|
| 1 | [TEAM] AI PM | 팀 보드 (Dashboard 겸용) |
| 2 | [TEAM] DevTeam | 팀 보드 |
| 3 | [TEAM] Research | 팀 보드 |
| 4 | [PRODUCT] MerryMatch | 제품 보드 |
| 5 | [HITL] Human Decision Queue | 인간 판단 대기열 |

---

## 보드 유형별 판단 기준

### [TEAM] 생성 조건
- 새로운 팀이 생성될 때
- `teams/*.yaml` 작성 시 자동 생성

### [PRODUCT] 생성 조건
- `projects/*/project.yaml`의 status가 `active`
- 해당 제품에 대한 첫 이슈 생성 시

### [TF] 생성 조건 (PM 판단 필요)
```
다음 조건을 모두 충족할 때 [TF] 생성 제안:
1. 여러 팀(2개 이상)이 동시에 참여해야 함
2. 명확한 목표와 종료 조건이 있음
3. 기존 [TEAM] 또는 [PRODUCT] 보드로는 관리가 어려움
```

**[TF] 생성 시 필수 정보:**
- 목표 (Goal)
- 참여 팀 목록
- 종료 조건
- 예상 기간

---

## 보드 조회 명령어

### 전체 보드 목록
```bash
gh project list --owner org-tinysolver
```

### 특정 보드 아이템 조회
```bash
gh project item-list <NUMBER> --owner org-tinysolver --format json
```

### 보드 이름 변경
```bash
gh project edit <NUMBER> --owner org-tinysolver --title "[유형] 새이름"
```

---

## 보드 생성 명령어

### [TEAM] 보드 생성
```bash
gh project create --owner org-tinysolver --title "[TEAM] <팀명>"
# 결과 number를 teams/<team>.yaml의 board.number에 기록
```

### [PRODUCT] 보드 생성
```bash
gh project create --owner org-tinysolver --title "[PRODUCT] <제품명>"
# 결과 number를 projects/<product>/project.yaml의 board.number에 기록
```

### [TF] 보드 생성
```bash
gh project create --owner org-tinysolver --title "[TF] <TF명>"
# TF 정보는 별도 문서로 관리 (또는 보드 description에 기록)
```

---

## 이슈를 보드에 추가

### 기본 명령
```bash
gh project item-add <PROJECT_NUMBER> --owner org-tinysolver --url <ISSUE_URL>
```

### 자동 추가 규칙

| 조건 | 추가할 보드 |
|------|-------------|
| ai-pm repo 이슈 | [TEAM] AI PM (#1) |
| ai-devteam repo 이슈 | [TEAM] DevTeam (#2) |
| ai-research repo 이슈 | [TEAM] Research (#3) |
| `ready-for-dev` 라벨 | [TEAM] AI PM (#1) |
| `ready-for-research` 라벨 | [TEAM] AI PM (#1) |
| `hitl` 라벨 | **[HITL] Human Decision Queue (#5)** |
| `blocked` 라벨 | [HITL] Human Decision Queue (#5) |
| 제품 관련 이슈 | 해당 [PRODUCT] 보드 |
| TF 관련 이슈 | 해당 [TF] 보드 |

### [HITL] 보드 핵심 규칙

**`hitl` 라벨 이슈는 반드시 [HITL] 보드에 추가:**
```bash
# hitl 라벨 이슈 생성 시
gh project item-add 5 --owner org-tinysolver --url <ISSUE_URL>
```

**[HITL] 보드의 목적:**
- 인간이 판단해야 하는 블로커 이슈 모음
- 이슈 해결 → 새 규칙 생성 → AI Agent 권한 확대
- 팀 자율성 확대를 위한 피드백 루프

### 제품 관련 이슈 판단
1. 이슈 제목에 제품명 포함 (예: `[MerryMatch]`, `MerryMatch:`)
2. 이슈 본문에 제품 키워드 포함 (project.yaml의 keywords 참조)
3. 제품 라벨 존재 (예: `merrymatch`)

---

## 보드 종료 규칙

### [TEAM] 보드
- 팀 해체 시에만 close (일반적으로 영구 유지)

### [PRODUCT] 보드
```bash
# project.yaml status가 archived일 때만 close
gh project close <NUMBER> --owner org-tinysolver
```

### [TF] 보드
```bash
# 목표 달성 또는 PM 판단 시 close
gh project close <NUMBER> --owner org-tinysolver
```

**[TF] close 전 체크리스트:**
- [ ] 목표 달성 여부 확인
- [ ] 회고 기록 작성
- [ ] 후속 작업 이슈 생성 (필요시)

---

## 체크리스트

### 이슈 생성 시
- [ ] 해당 repo의 [TEAM] 보드에 추가
- [ ] `ready-for-*` 라벨이면 [TEAM] AI PM에도 추가
- [ ] `hitl` 라벨이면 **[HITL] Human Decision Queue (#5)에 추가**
- [ ] `blocked` 라벨이면 [HITL] 보드에도 추가
- [ ] 제품 관련이면 [PRODUCT] 보드에도 추가
- [ ] TF 관련이면 [TF] 보드에도 추가

### 새 제품 시작 시
- [ ] `[PRODUCT] <제품명>` 보드 생성
- [ ] projects/<product>/project.yaml에 board 섹션 추가
- [ ] 기존 관련 이슈 보드에 추가

### TF 시작 시
- [ ] PM과 TF 필요성 확인
- [ ] `[TF] <TF명>` 보드 생성
- [ ] 목표/종료조건/참여팀 문서화
- [ ] 관련 이슈 보드에 추가

### TF 종료 시
- [ ] 목표 달성 확인
- [ ] 회고 기록
- [ ] 보드 close

---

## 예시 시나리오

### 시나리오 1: 제품 관련 이슈 생성

```bash
# 1. ai-devteam에 MerryMatch 이슈 생성
gh issue create -R org-tinysolver/ai-devteam \
  --title "[MerryMatch] Firebase 설정" \
  --label "hitl"

# 2. [TEAM] DevTeam 보드에 추가
gh project item-add 2 --owner org-tinysolver \
  --url https://github.com/org-tinysolver/ai-devteam/issues/XX

# 3. hitl 라벨이므로 [TEAM] AI PM에도 추가
gh project item-add 1 --owner org-tinysolver \
  --url https://github.com/org-tinysolver/ai-devteam/issues/XX

# 4. [PRODUCT] MerryMatch 보드에도 추가
gh project item-add 4 --owner org-tinysolver \
  --url https://github.com/org-tinysolver/ai-devteam/issues/XX
```

### 시나리오 2: 새 제품 보드 생성

```bash
# 1. 보드 생성
gh project create --owner org-tinysolver --title "[PRODUCT] NewService"
# 출력: Created project #5

# 2. projects/newservice/project.yaml에 board 섹션 추가
board:
  name: "[PRODUCT] NewService"
  number: 5
  url: https://github.com/orgs/org-tinysolver/projects/5
```

### 시나리오 3: TF 생성 (PM 승인 필요)

```bash
# PM이 TF 필요 판단 후:

# 1. 보드 생성
gh project create --owner org-tinysolver --title "[TF] 인증시스템개편"
# 출력: Created project #6

# 2. TF 정보 기록 (보드 description 또는 별도 문서)
# - 목표: 인증시스템 OAuth2.0 전환
# - 참여팀: DevTeam, Research
# - 종료조건: OAuth 로그인 기능 배포 완료
# - 예상기간: 2주

# 3. 관련 이슈들 보드에 추가
gh project item-add 6 --owner org-tinysolver \
  --url https://github.com/org-tinysolver/ai-devteam/issues/XX
```

---

## 보드 필드 권장 구성

### [TEAM] 보드
| 필드 | 타입 | 용도 |
|------|------|------|
| Status | Single select | Todo, In Progress, Done |
| Type | Single select | internal, external, hitl |
| Priority | Single select | P0, P1, P2, P3 |

### [PRODUCT] 보드
| 필드 | 타입 | 용도 |
|------|------|------|
| Status | Single select | Todo, In Progress, Done, Blocked |
| Component | Single select | frontend, backend, infra |
| Sprint | Iteration | 스프린트 관리 (선택) |

### [TF] 보드
| 필드 | 타입 | 용도 |
|------|------|------|
| Status | Single select | Todo, In Progress, Done, Blocked |
| Owner | Single select | 담당자 |
| Deadline | Date | 마감일 |

---

## 관련 문서

- human-docs/standards/github-projects-structure.md - 보드 체계 기준 (WHY)
- agent-docs/schemas/project-schema.md - 프로젝트 스키마
- teams/*.yaml - 팀별 보드 설정
