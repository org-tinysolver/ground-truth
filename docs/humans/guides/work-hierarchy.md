# Work Hierarchy & Progress Tracking

AI PM과 함께 일하는 방식을 정의합니다. 프리랜서로서 성과를 측정하고 증명할 수 있도록 OKR + Kanban 하이브리드 방식을 사용합니다.

## Hierarchy Structure

```
Organization (org-tinysolver)
└── Project (저장소/서비스)
    └── Objective (분기 목표)
        └── Key Result (측정 가능한 결과)
            └── Task (실행 작업)
```

### Level Definitions

| Level | Definition | Duration | Tracking |
|-------|------------|----------|----------|
| **Project** | 독립된 저장소/서비스 | Ongoing | `projects/` folder |
| **Objective** | 분기별 달성 목표 | Quarterly (3 months) | `objectives/` folder |
| **Key Result** | 목표 달성을 측정하는 지표 | Quarterly | GitHub Milestone |
| **Task** | 단일 실행 가능 작업 | Hours ~ Days | GitHub Issue |

---

## OKR (Objectives & Key Results)

### Objective 작성 규칙

1. **영감을 주는 목표**: 무엇을 달성하고 싶은지 명확히
2. **정성적 표현**: 숫자 없이 방향성 제시
3. **분기 단위**: 3개월 내 달성 가능한 범위

**좋은 예시:**
- "개인 브랜딩 웹사이트 런칭"
- "AI 기반 자동화 시스템 구축"
- "클라이언트 프로젝트 성공적 딜리버리"

**나쁜 예시:**
- "웹사이트 만들기" (너무 모호)
- "100개 기능 추가" (Key Result와 혼동)

### Key Result 작성 규칙

1. **측정 가능**: 0% → 100% 또는 숫자로 표현
2. **구체적**: 달성 여부가 명확
3. **2-5개**: Objective당 적정 개수

**형식:**
```
KR: "[측정 지표] [시작값] → [목표값]"
```

**예시:**
```yaml
Objective: "개인 브랜딩 웹사이트 런칭"

Key Results:
  - KR1: "랜딩페이지 배포 완료" (0% → 100%)
  - KR2: "블로그 섹션 구현" (0% → 100%)
  - KR3: "Lighthouse 성능 점수" (0 → 90+)
  - KR4: "월간 방문자 수" (0 → 100명)
```

### OKR 파일 구조

```
objectives/
├── 2025-Q1/
│   ├── objective.yaml      # OKR 정의
│   ├── progress.md         # 주간 진행 기록
│   └── retrospective.md    # 분기 회고
└── 2025-Q2/
    └── ...
```

### objective.yaml 템플릿

```yaml
quarter: 2025-Q1
period:
  start: 2025-01-01
  end: 2025-03-31

objectives:
  - id: obj-001
    title: "개인 브랜딩 웹사이트 런칭"
    project: tinysolver-me
    key_results:
      - id: kr-001
        description: "랜딩페이지 배포 완료"
        metric_type: completion  # completion | numeric | percentage
        start_value: 0
        target_value: 100
        current_value: 0
        unit: "%"

      - id: kr-002
        description: "Lighthouse 성능 점수"
        metric_type: numeric
        start_value: 0
        target_value: 90
        current_value: 0
        unit: "점"

status: active  # active | completed | cancelled
created_at: 2025-01-01
updated_at: 2025-01-01
```

---

## Kanban Task Management

### Task States

```
Backlog → Todo → In Progress → Review → Done
```

| State | Description | 소유자 |
|-------|-------------|--------|
| **Backlog** | 아이디어/요청 수집 | - |
| **Todo** | 실행 준비 완료 | AI PM |
| **In Progress** | 작업 중 | AI PM |
| **Review** | HITL 승인 대기 | User |
| **Done** | 완료 및 검증됨 | - |

### Task 작성 규칙

1. **단일 작업**: 하나의 Task = 하나의 결과물
2. **실행 가능**: 바로 시작할 수 있는 수준으로 구체화
3. **시간 추정**: 보통 수 시간 ~ 2-3일 범위
4. **Key Result 연결**: 어떤 KR에 기여하는지 명시

**Task 제목 형식:**
```
[Type] Brief description
```

**Types:**
- `[Feature]` - 새 기능
- `[Fix]` - 버그 수정
- `[Refactor]` - 코드 개선
- `[Content]` - 콘텐츠 추가/수정
- `[Infra]` - 인프라/배포
- `[Docs]` - 문서화

---

## Metrics & Tracking

### 핵심 지표 (Core Metrics)

프리랜서 성과 증명을 위한 핵심 지표:

| Metric | Description | 계산 방법 | 목적 |
|--------|-------------|-----------|------|
| **OKR 달성률** | 분기 목표 달성도 | (달성 KR / 전체 KR) × 100 | 결과 증명 |
| **Task 완료 수** | 완료한 작업 개수 | Count of Done tasks | 실행력 |
| **Cycle Time** | Task 시작→완료 시간 | In Progress → Done 평균 | 효율성 |
| **Throughput** | 단위 기간 처리량 | Tasks completed / week | 생산성 |
| **On-time Rate** | 예정일 준수율 | (정시 완료 / 전체) × 100 | 신뢰성 |

### 보조 지표 (Supporting Metrics)

| Metric | Description |
|--------|-------------|
| **Commits** | 코드 기여도 |
| **Lines of Code** | 코드 생산량 (참고용) |
| **Deploy Count** | 배포 횟수 |
| **Bug Rate** | 버그 발생률 |

### 주간 Progress 기록

`objectives/YYYY-QN/progress.md`:

```markdown
## Week 3 (Jan 15-21)

### Key Results Progress
| KR | Target | Current | Progress |
|----|--------|---------|----------|
| KR1: 랜딩페이지 | 100% | 75% | ▓▓▓▓▓▓▓░░░ |
| KR2: 블로그 | 100% | 20% | ▓▓░░░░░░░░ |

### Completed Tasks
- [Feature] Hero section implementation
- [Feature] Navigation component
- [Infra] Cloudflare Pages setup

### Metrics
- Tasks completed: 5
- Avg cycle time: 1.5 days
- Commits: 12

### Blockers
- None

### Next Week
- Complete portfolio section
- Start blog layout
```

---

## Retrospective (회고)

### 분기 회고 템플릿

`objectives/YYYY-QN/retrospective.md`:

```markdown
# 2025 Q1 Retrospective

## Summary
- **Period**: 2025-01-01 ~ 2025-03-31
- **OKR 달성률**: 87%
- **총 Task 완료**: 47개
- **평균 Cycle Time**: 1.8일

## Objectives Review

### OBJ-001: 개인 브랜딩 웹사이트 런칭 ✅
| Key Result | Target | Actual | Status |
|------------|--------|--------|--------|
| 랜딩페이지 배포 | 100% | 100% | ✅ |
| 블로그 섹션 | 100% | 100% | ✅ |
| Lighthouse 90+ | 90 | 95 | ✅ |
| 월간 방문자 100명 | 100 | 78 | ⚠️ 78% |

**Achievement Rate**: 94%

## Metrics Summary

| Metric | Value | Trend |
|--------|-------|-------|
| Tasks Completed | 47 | - |
| Avg Cycle Time | 1.8 days | - |
| On-time Rate | 91% | - |
| Commits | 142 | - |
| Deploys | 23 | - |

## What Went Well
- 랜딩페이지 예정보다 빠르게 완료
- Lighthouse 성능 최적화 성공
- HITL 체크포인트로 품질 유지

## What Could Improve
- 방문자 목표 미달 → 마케팅/SEO 필요
- 일부 Task 추정 오류 → 버퍼 추가 필요

## Key Learnings
- Cloudflare Pages 배포 워크플로우 확립
- shadcn/ui 컴포넌트 활용 패턴 습득

## Next Quarter Focus
- SEO 최적화
- 콘텐츠 마케팅 시작
```

---

## Portfolio Output (성과 정리)

### 클라이언트/면접용 성과 요약

```markdown
# Project: TinySolver.me

## Overview
개인 브랜딩 웹사이트 기획, 개발, 배포

## Duration
2025 Q1 (3 months)

## Results
- ✅ OKR 달성률: 94%
- ✅ 47개 Task 완료 (평균 1.8일/task)
- ✅ Lighthouse 성능: 95점
- ✅ 23회 프로덕션 배포

## Tech Stack
React, Remix, TypeScript, TailwindCSS, Cloudflare Pages

## Key Achievements
- 반응형 웹 디자인 구현
- CI/CD 파이프라인 구축
- 성능 최적화 (Lighthouse 95점)

## Links
- Live: https://tinysolver.me
- GitHub: github.com/org-tinysolver/tinysolver.me
```

---

## Quick Reference

### 새 분기 시작 시
1. `objectives/YYYY-QN/` 폴더 생성
2. `objective.yaml` 작성 (Objective + Key Results)
3. Key Result별 GitHub Milestone 생성
4. Task 생성 및 Milestone 연결

### 주간 루틴
1. Progress 업데이트 (매주 금요일)
2. KR 현재값 갱신
3. 다음 주 Task 계획

### 분기 종료 시
1. 모든 KR 최종 측정
2. `retrospective.md` 작성
3. 포트폴리오용 성과 정리
4. 다음 분기 OKR 초안

---

## Integration with AI PM

AI PM이 자동으로 수행하는 작업:

1. **Task → KR 연결**: Task 생성 시 관련 Key Result 자동 매핑
2. **Progress 계산**: Task 완료 시 KR 진행률 자동 업데이트
3. **Metrics 수집**: Cycle time, throughput 자동 계산
4. **회고 데이터 준비**: 분기 종료 시 metrics 자동 집계

### HITL Checkpoints

| 시점 | 승인 필요 |
|------|----------|
| OKR 확정 | ✅ 분기 시작 전 |
| KR 목표 변경 | ✅ |
| 프로덕션 배포 | ✅ |
| 분기 회고 완료 | ✅ |

