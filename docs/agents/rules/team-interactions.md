# 팀 간 상호작용 규칙

> 각 팀(PM, DevTeam, Research)이 서로를 호출하는 방법과 R&R

## 팀 구성

| 팀 | Repo | 역할 |
|----|------|------|
| **PM** | ai-pm | 기획, 위임, 조율, 문서화 |
| **DevTeam** | ai-devteam | 구현, 배포, 인프라 |
| **Research** | ai-research | 조사, 분석, 리포트 |

---

## R&R 매트릭스

### PM의 역할

| 하는 것 | 하지 않는 것 |
|--------|-------------|
| 작업 기획/분해 | 코드 구현 |
| Issue 생성 | 배포 실행 |
| 팀에 위임 | 인프라 설정 |
| 진행 상황 추적 | 직접 리서치 수행 |
| 의사결정 조율 | |
| 문서화 (회의록, 규칙) | |

### DevTeam의 역할

| 하는 것 | 하지 않는 것 |
|--------|-------------|
| 코드 구현 | 기획/요구사항 정의 |
| 배포 실행 | 우선순위 결정 |
| 인프라 설정 | 리서치 |
| 버그 수정 | |
| PR 생성 | |

### Research의 역할

| 하는 것 | 하지 않는 것 |
|--------|-------------|
| 기술 조사 | 코드 구현 |
| 비교 분석 | 배포 |
| 리포트 작성 | 의사결정 (추천만) |
| 문서 정리 | |

---

## 팀 간 호출 방법

### PM → DevTeam

**언제**: 구현/배포 작업이 필요할 때

**방법**:
1. ai-devteam repo에 Issue 생성
2. `ready-for-dev` 라벨 추가
3. `delegations/devteam/` 에 위임 파일 생성 → Slack 알림

```markdown
# delegations/devteam/2025-12-14-issue-xxx.md

# [작업 제목]

## Issue
- Repo: org-tinysolver/ai-devteam
- Issue: #xxx
- URL: https://github.com/org-tinysolver/ai-devteam/issues/xxx

## 요약
[작업 내용]

## 우선순위
P1
```

---

### PM → Research

**언제**: 조사/분석이 필요할 때

**방법**:
1. ai-research repo에 Issue 생성
2. `ready-for-research` 라벨 추가
3. `delegations/research/` 에 위임 파일 생성 → Slack 알림

---

### DevTeam → PM

**언제**:
- 작업 완료 보고
- 블로커 발생
- HITL 승인 필요

**방법**:
1. Issue에 `done` 라벨 + close (완료 시)
2. Issue에 `blocked` 라벨 + 코멘트 (블로커 시)
3. PM repo에 Issue 생성 (HITL 필요 시)

```bash
# 완료
gh issue edit <N> -R org-tinysolver/ai-devteam --add-label "done"
gh issue close <N>

# 블로커
gh issue edit <N> --add-label "blocked"
gh issue comment <N> --body "Blocked: [이유]"
```

---

### DevTeam → Research

**언제**: 구현 중 기술 조사가 필요할 때

**방법**:
1. ai-research repo에 Issue 생성
2. `ready-for-research` 라벨 추가
3. (선택) PM에게 알림

```bash
gh issue create -R org-tinysolver/ai-research \
  --title "[Research] xxx 기술 조사 요청" \
  --label "ready-for-research" \
  --body "## 배경\n[왜 필요한지]\n\n## 질문\n[알고 싶은 것]"
```

---

### Research → PM

**언제**:
- 리서치 완료 보고
- 의사결정 필요

**방법**:
1. Issue에 `done` 라벨 + close
2. 결과물을 ai-research repo에 커밋
3. PM이 `/pm-context`로 확인

---

### Research → DevTeam

**언제**: 리서치 결과로 구현이 필요할 때

**방법**:
1. PM에게 요청 (직접 위임 X)
2. PM이 DevTeam에 위임

```
Research → PM → DevTeam (권장)
Research → DevTeam (긴급 시에만)
```

---

## 호출 흐름도

```
                    ┌─────────────┐
                    │     PM      │
                    │   (ai-pm)   │
                    └──────┬──────┘
                           │
            ┌──────────────┼──────────────┐
            │              │              │
            ▼              │              ▼
    ┌───────────────┐      │      ┌───────────────┐
    │   DevTeam     │◄─────┴─────►│   Research    │
    │ (ai-devteam)  │             │ (ai-research) │
    └───────────────┘             └───────────────┘
            │                             │
            └──────────────┬──────────────┘
                           │
                    (긴급 시 직접 호출 가능)
```

---

## 알림 채널

| 발신 | 수신 | 채널 | 방법 |
|------|------|------|------|
| PM | DevTeam | SLACK_WEBHOOK_DEVTEAM | delegations/devteam/ |
| PM | Research | SLACK_WEBHOOK_RESEARCH | delegations/research/ |
| DevTeam | PM | SLACK_WEBHOOK_PM | Issue 라벨 변경 |
| Research | PM | SLACK_WEBHOOK_PM | Issue 라벨 변경 |

---

## 우선순위 규칙

각 팀은 다음 우선순위로 작업:

```
1순위: 외부 위임 (ready-for-dev, ready-for-research)
2순위: 내부 개선 (internal 라벨)
3순위: 백로그
```

---

## 블로커 에스컬레이션

```
블로커 발생
    │
    ├─ 다른 팀 작업 필요? → 해당 팀에 Issue 생성
    │
    ├─ HITL 필요? → PM에게 hitl/ 파일로 요청
    │
    └─ 기타 → Issue에 blocked 라벨 + 코멘트
```

---

## 경로 표기 규칙

팀 간 위임 시 파일 경로 혼란 방지:

| 형식 | 예시 | 사용 |
|------|------|------|
| ✅ 홈 기준 | `~/org-tinysolver/ai-pm/...` | 권장 |
| ❌ 상대 경로 | `org-tinysolver/ai-pm/...` | 금지 |
| ❌ 절대 경로 | `/Users/xxx/org-tinysolver/...` | 피함 |

**이유**: 각 팀은 같은 서버에서 파일시스템 접근 가능. `~/` 누락 시 경로 인식 불가.
