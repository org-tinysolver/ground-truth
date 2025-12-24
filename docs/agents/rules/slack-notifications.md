# Slack 알림 규칙

> 파일 기반 알림 시스템. 특정 폴더에 파일 생성 → GitHub Actions → Slack 알림

## 핵심 원칙

1. **파일 기반**: 알림 내용을 마크다운 파일로 작성
2. **자동 전송**: GitHub Actions가 파일 감지 후 Slack 전송
3. **링크 제공**: 상세 내용은 GitHub 링크로 전달

---

## 폴더 구조

```
ai-pm/
├── meetings/              # 회의록 → PM 채널
├── reports/               # 리포트 → PM 채널
│   ├── sessions/         # 세션 기록 (완결/미완결)
│   ├── analyses/         # 분석 리포트
│   └── research/         # 리서치 결과
├── delegations/           # 위임 알림
│   ├── devteam/          # → DevTeam 채널
│   └── research/         # → Research 채널
├── blockers/              # 블로커/실패 → PM 채널
└── hitl/                  # HITL 승인 요청 → PM 채널
```

---

## 알림 유형별 사용법

### 1. 회의록 알림

**폴더**: `meetings/YYYY-MM/`
**트리거**: 파일 푸시 시 자동
**채널**: PM

```bash
# 파일 생성 후 커밋/푸시하면 자동 알림
meetings/2025-12/2025-12-14-DEC-001.md
```

### 2. 세션 기록 알림 (NEW)

**폴더**: `reports/sessions/`
**트리거**: 파일 푸시 시 자동
**채널**: PM
**워크플로우**: `.github/workflows/notify-session.yml`

**알림 유형**:
| status | 알림 | 설명 |
|--------|------|------|
| `closed` | ✅ 세션 완료 | 작업 완전히 해결됨 |
| `open` | 🔄 세션 진행 중 | 미완결, 이어서 해야 함 |

**파일 형식**:
```markdown
---
status: closed | open
date: YYYY-MM-DD
project: "project-name"
issue: "#123"  # open일 때 필수
---

# {세션 제목}

## 요약
{1-2문장 요약}
```

**사용법**:
- `/pm-close` 명령어로 자동 생성
- 미완결 시 GitHub Issue 연동

### 3. 리포트 알림

**폴더**: `reports/analyses/`, `reports/research/`
**트리거**: 파일 푸시 시 자동
**채널**: PM

```bash
reports/analyses/2025-12-14-security-audit.md
reports/research/2025-12-14-framework-comparison.md
```

### 4. DevTeam 위임

**폴더**: `delegations/devteam/`
**트리거**: 파일 푸시 시 자동
**채널**: DevTeam

**파일 형식**:
```markdown
# [작업 제목]

## Issue
- Repo: org-tinysolver/ai-devteam
- Issue: #21
- URL: https://github.com/org-tinysolver/ai-devteam/issues/21

## 요약
[작업 내용 요약]

## 우선순위
P1
```

### 5. Research 위임

**폴더**: `delegations/research/`
**트리거**: 파일 푸시 시 자동
**채널**: Research

### 6. HITL 승인 요청

**폴더**: `hitl/`
**트리거**: 파일 푸시 시 자동
**채널**: PM

**파일 형식**:
```markdown
# [승인 요청 제목]

## 작업
[무엇을 하려는지]

## 이유
[왜 승인이 필요한지]

## 영향
[실행 시 영향]

## 승인 방법
Slack에서 :white_check_mark: 이모지로 승인
```

### 7. 블로커 알림

**폴더**: `blockers/`
**트리거**: 파일 푸시 시 자동
**채널**: PM
**워크플로우**: `.github/workflows/notify-blocker.yml`

**알림 유형**:
| severity | 알림 | 설명 |
|----------|------|------|
| `high` | 🚨 블로커 발생 (High) | Human 개입 필수 |
| `medium` | ⚠️ 블로커 발생 (Medium) | 해결 방안 제안됨 |
| `low` | ℹ️ 경고 | 진행 가능 |
| `resolved` | ✅ 블로커 해결됨 | 문제 해결 완료 |

**파일 형식**:
```markdown
---
status: blocked | resolved | bypassed
severity: high | medium | low
category: hook | permission | dependency | timeout | network | build | test | other
date: YYYY-MM-DD
time: HH:MM:SS
project: "project-name"
---

# {블로커 제목}

## 문제
{무엇이 막혔는지}

## 에러
{에러 메시지}

## 해결 방안
{제안된 해결책들}
```

**사용법**:
- 블로커 감지 시 `report-blocker` 스킬이 자동 제안
- High severity는 기록 권장
- 상세 규칙: `agent-docs/rules/blocker-reporting.md`

---

## GitHub Secrets 필요

| Secret | 용도 | Repo |
|--------|------|------|
| `SLACK_WEBHOOK_MEETING` | 회의록/리포트 | ai-pm |
| `SLACK_WEBHOOK_PM` | HITL 승인 | ai-pm |
| `SLACK_WEBHOOK_DEVTEAM` | DevTeam 위임 | ai-pm |
| `SLACK_WEBHOOK_RESEARCH` | Research 위임 | ai-pm |

---

## 흐름

```
PM이 파일 생성
    │
    ▼
git add → commit → push
    │
    ▼
GitHub Actions 감지 (.github/workflows/)
    │
    ▼
해당 채널로 Slack 알림 (파일 링크 포함)
    │
    ▼
수신자가 링크 클릭하여 상세 확인
```

---

## 파일 네이밍

```
YYYY-MM-DD-[타입]-[순번].md

예시:
- 2025-12-14-delegate-001.md
- 2025-12-14-hitl-deploy.md
```

---

## 예외 (알림 안 보내는 경우)

- README.md 수정
- .gitkeep 파일
- 드래프트/WIP 파일 (파일명에 draft- 포함)
