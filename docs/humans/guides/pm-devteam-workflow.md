# PM-DevTeam 워크플로우 가이드

> 인간이 검증하기 위한 문서. AI PM과 AI DevTeam 간의 작업 위임/완료 흐름.

## 전체 흐름도

```
┌─────────────────────────────────────────────────────────────────────────┐
│                              HUMAN (You)                                │
│                                                                         │
│   1. PM repo에서 작업 지시     4. 완료 확인 (pm-context)                │
│              │                          ▲                               │
│              ▼                          │                               │
└─────────────────────────────────────────────────────────────────────────┘
               │                          │
               ▼                          │
┌──────────────────────────────┐          │
│         AI PM                │          │
│    (ai-pm repo 세션)         │          │
│                              │          │
│  - Issue 생성                │          │
│  - ready-for-dev 라벨 부여   │          │
│  - GitHub Issue 상태 조회    │──────────┘
│                              │
└──────────────────────────────┘
               │
               │ GitHub Issue (ready-for-dev 라벨)
               ▼
┌──────────────────────────────┐
│       AI DevTeam             │
│   (ai-devteam repo 세션)     │
│                              │
│  - /dev-context로 할 일 확인 │
│  - 라벨 변경 (in-progress)   │
│  - 작업 수행                 │
│  - 완료 시 라벨 (done)       │
│  - Issue Close               │
│                              │
└──────────────────────────────┘
```

---

## 단계별 상세

### Step 1: PM이 작업 위임

**Where**: ai-pm repo 세션

**What**:
1. DevTeam repo에 Issue 생성
2. `ready-for-dev` 라벨 부여

**Command**:
```bash
# Issue 생성 (PM이 직접 또는 /pm-delegate 사용)
gh issue create -R org-tinysolver/ai-devteam \
  --title "[Feature] xxx" \
  --body "작업 내용..."

# 라벨 부여
gh issue edit <N> -R org-tinysolver/ai-devteam --add-label "ready-for-dev"
```

**Result**:
- GitHub Issue 생성됨
- `ready-for-dev` 라벨 붙음

---

### Step 2: DevTeam이 작업 확인

**Where**: ai-devteam repo 세션

**What**:
1. `/dev-context` 실행
2. `ready-for-dev` 라벨 Issue 목록 확인

**Command**:
```bash
gh issue list -R org-tinysolver/ai-devteam --label "ready-for-dev" --state open
```

**Result**:
- 할당된 작업 목록 보임

---

### Step 3: DevTeam이 작업 시작

**Where**: ai-devteam repo 세션

**What**:
1. 라벨 변경: `ready-for-dev` → `in-progress`
2. 작업 수행

**Command**:
```bash
gh issue edit <N> -R org-tinysolver/ai-devteam \
  --remove-label "ready-for-dev" \
  --add-label "in-progress"
```

**Result**:
- Issue가 `in-progress` 상태로 변경됨

---

### Step 4: DevTeam이 작업 완료

**Where**: ai-devteam repo 세션

**What**:
1. 코드 커밋/푸시
2. 라벨 변경: `in-progress` → `done`
3. Issue Close

**Command**:
```bash
# 라벨 변경
gh issue edit <N> -R org-tinysolver/ai-devteam \
  --remove-label "in-progress" \
  --add-label "done"

# Issue 닫기
gh issue close <N> -R org-tinysolver/ai-devteam
```

**Result**:
- Issue가 Closed 상태
- `done` 라벨 붙음

---

### Step 5: PM이 완료 확인

**Where**: ai-pm repo 세션

**What**:
1. `/pm-context` 실행
2. GitHub Issue 상태 조회

**Command**:
```bash
# 완료된 Issue 확인
gh issue list -R org-tinysolver/ai-devteam --label "done" --state closed

# 또는 특정 Issue 상태 확인
gh issue view <N> -R org-tinysolver/ai-devteam
```

**Result**:
- Issue가 Closed + done 라벨 → 완료됨

---

## 상태 확인 방법 (인간용)

### GitHub에서 직접 확인

1. https://github.com/org-tinysolver/ai-devteam/issues
2. 라벨 필터로 상태 확인:
   - `ready-for-dev` → 대기 중
   - `in-progress` → 작업 중
   - `done` + Closed → 완료

### CLI로 확인

```bash
# 전체 상태 한눈에
gh issue list -R org-tinysolver/ai-devteam --state all --limit 20
```

---

## GitHub Projects Board 연동

### 현재 상태: 수동

현재는 GitHub Projects Board와 자동 연동되지 않음.
Issue 라벨과 상태(open/closed)로만 추적.

### 자동화 옵션 (TODO)

1. **GitHub Actions**: Issue 라벨 변경 시 Board 자동 이동
2. **GitHub Projects Automation**: Built-in 규칙 사용

---

## 라벨 체계

| 라벨 | 의미 | 누가 붙이나 | Issue 상태 |
|------|------|-----------|-----------|
| `ready-for-dev` | 작업 가능 | PM | Open |
| `in-progress` | 작업 중 | DevTeam | Open |
| `blocked` | 블로커 있음 | DevTeam | Open |
| `done` | 완료됨 | DevTeam | Closed |

---

## 검증 체크리스트

### 위임 시 (PM)
- [ ] Issue가 ai-devteam repo에 생성됨?
- [ ] `ready-for-dev` 라벨이 붙음?

### 작업 시작 시 (DevTeam)
- [ ] `/dev-context`에서 Issue가 보임?
- [ ] 라벨이 `in-progress`로 변경됨?

### 완료 시 (DevTeam)
- [ ] 코드가 커밋/푸시됨?
- [ ] 라벨이 `done`으로 변경됨?
- [ ] Issue가 Closed 됨?

### 확인 시 (PM)
- [ ] `/pm-context`에서 완료 상태 확인 가능?
- [ ] `gh issue view <N>`으로 상세 확인 가능?

---

## 현재 한계점

1. **알림 없음**: PM이 능동적으로 확인해야 함 (polling)
2. **Board 수동**: GitHub Projects Board는 별도 갱신 필요
3. **단일 세션**: 한 번에 하나의 세션만 작업

### 개선 방안 (Future)

| 문제 | 해결책 |
|-----|-------|
| 알림 없음 | Slack 웹훅 연동 (Issue close 시 알림) |
| Board 수동 | GitHub Actions로 자동 이동 |
| 세션 분리 | 각 repo에 독립적 context 유지 |

---

## 요약

```
PM 위임 → DevTeam 작업 → DevTeam 완료 → PM 확인
   │           │              │            │
   │           │              │            └─ gh issue view <N>
   │           │              └─ done 라벨 + close
   │           └─ in-progress 라벨
   └─ ready-for-dev 라벨
```

**핵심**: GitHub Issue의 라벨과 상태(open/closed)가 유일한 진실의 원천(Source of Truth)
