# Task Group Schema

큰 작업을 여러 Issue로 분할할 때 순차/병렬 관계를 정의하는 스키마입니다.

---

## 핵심 개념

```
Task Group = 여러 Issue의 묶음 + 실행 순서 정의
```

| 유형 | 설명 | Dev Agent 동작 |
|------|------|---------------|
| **Parallel** | 서로 의존성 없음 | 동시에 여러 Issue 처리 가능 |
| **Sequential** | 순서대로 실행 필요 | 앞 Issue 완료 후 다음 시작 |

---

## Task Group 구조

### GitHub Project 기반 관리

```yaml
# Task Group은 GitHub Project의 하나의 View로 관리
task_group:
  id: "landing-page-improvement"
  name: "랜딩 페이지 개선"
  project: "tinysolver-me"
  created_at: "2025-12-13"
  status: "in_progress"  # pending | in_progress | completed

  # 전체 Issue 목록
  total_issues: 6
  completed_issues: 2

  # 실행 구조
  execution:
    - type: "parallel"
      issues: [10, 11, 12, 13]
    - type: "sequential"
      issues: [14, 15]
```

---

## 실행 구조 정의

### Parallel (병렬)

```yaml
execution:
  - type: "parallel"
    label: "UI 컴포넌트 (동시 작업 가능)"
    issues:
      - number: 10
        title: "Hero 타이틀 변경"
        status: "ready"
      - number: 11
        title: "About 섹션 추가"
        status: "ready"
      - number: 12
        title: "Footer 수정"
        status: "ready"
```

**Dev Agent 동작:**
- 3개 Issue를 동시에 처리 가능
- 각각 독립적으로 PR 생성
- 순서 상관없이 완료

### Sequential (순차)

```yaml
execution:
  - type: "sequential"
    label: "API 연동 (순서대로)"
    issues:
      - number: 20
        title: "DB 스키마 변경"
        status: "ready"
        next: 21
      - number: 21
        title: "API 엔드포인트 추가"
        status: "blocked"  # Issue #20 완료 대기
        depends_on: 20
        next: 22
      - number: 22
        title: "프론트엔드 연동"
        status: "blocked"  # Issue #21 완료 대기
        depends_on: 21
```

**Dev Agent 동작:**
- #20 먼저 처리
- #20 완료 후 #21 시작
- #21 완료 후 #22 시작

---

## 복합 구조 예시

```yaml
task_group:
  id: "user-auth-system"
  name: "사용자 인증 시스템"

  execution:
    # Phase 1: 병렬로 기반 작업
    - type: "parallel"
      phase: 1
      label: "기반 작업 (동시 가능)"
      issues:
        - number: 30
          title: "User 테이블 생성"
        - number: 31
          title: "인증 유틸리티 함수 작성"

    # Phase 2: Phase 1 완료 후 순차 실행
    - type: "sequential"
      phase: 2
      depends_on_phase: 1
      label: "API 구현 (순서대로)"
      issues:
        - number: 32
          title: "회원가입 API"
          depends_on: [30, 31]
        - number: 33
          title: "로그인 API"
          depends_on: 32

    # Phase 3: Phase 2 완료 후 병렬 실행
    - type: "parallel"
      phase: 3
      depends_on_phase: 2
      label: "프론트엔드 (동시 가능)"
      issues:
        - number: 34
          title: "회원가입 폼"
          depends_on: 32
        - number: 35
          title: "로그인 폼"
          depends_on: 33
```

**시각화:**
```
Phase 1 (Parallel)
├── #30 User 테이블 ─────┐
└── #31 인증 유틸리티 ───┤
                         │
Phase 2 (Sequential)     ▼
├── #32 회원가입 API ────┐
└── #33 로그인 API ──────┤ (순서대로)
                         │
Phase 3 (Parallel)       ▼
├── #34 회원가입 폼
└── #35 로그인 폼
```

---

## Issue 라벨링

### 의존성 표시

| Label | 의미 |
|-------|------|
| `parallel` | 병렬 실행 가능 |
| `sequential` | 순차 실행 필요 |
| `blocked` | 선행 작업 대기 중 |
| `ready-for-dev` | 바로 작업 가능 |

### Issue Body에 명시

```markdown
## 의존성

- **Task Group**: 랜딩 페이지 개선
- **실행 유형**: Parallel / Sequential
- **선행 작업**: 없음 / Issue #XX 완료 후
- **후속 작업**: Issue #YY (참고용)
```

---

## PM 워크플로우

### 1. 큰 작업 분석

```
"랜딩 페이지 전체 리뉴얼"
         │
         ▼
   [작업 분해]
         │
    ┌────┴────┬────────┬────────┐
    ▼         ▼        ▼        ▼
  Hero     About   Features  Footer
```

### 2. 의존성 파악

```
질문: 이 작업들 중 서로 영향을 주는 게 있나?

Hero    ──→ 독립적
About   ──→ 독립적
Features ──→ 독립적
Footer  ──→ 독립적

결론: 모두 Parallel
```

### 3. Task Group 생성

```bash
# GitHub Project에 Task Group View 생성
gh project item-add 1 --owner org-tinysolver --url <ISSUE_URL>

# 각 Issue에 라벨 추가
gh issue edit 10 -R org-tinysolver/repo --add-label "parallel,ready-for-dev"
```

### 4. Dev Agent에게 전달

```markdown
## Task Group: 랜딩 페이지 개선

### Parallel (동시 작업 가능)
- Issue #10: Hero 수정 → `ready-for-dev`
- Issue #11: About 추가 → `ready-for-dev`
- Issue #12: Features 추가 → `ready-for-dev`
- Issue #13: Footer 수정 → `ready-for-dev`

Dev Agent는 위 4개 Issue를 동시에 처리할 수 있습니다.
```

---

## Dev Agent 처리 로직

```python
def process_task_group(task_group):
    for phase in task_group.execution:
        if phase.type == "parallel":
            # 동시에 처리
            parallel_process(phase.issues)
        elif phase.type == "sequential":
            # 순서대로 처리
            for issue in phase.issues:
                process_issue(issue)
                mark_next_as_ready(issue.next)
```

---

## Quick Reference

```
Parallel:  서로 독립적 → 동시 실행 가능
Sequential: 순서 의존 → 앞 작업 완료 후 시작

Label:
- `parallel` + `ready-for-dev` = 바로 작업 가능
- `sequential` + `blocked` = 선행 작업 대기
- `sequential` + `ready-for-dev` = 순번 도착, 작업 가능
```
