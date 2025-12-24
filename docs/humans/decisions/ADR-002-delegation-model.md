# ADR-002: Agent Delegation Model

> **Status**: Accepted
> **Date**: 2025-12-14
> **Deciders**: org-tinysolver

## Context

AI PM이 모든 작업을 직접 수행할 수 없으며, 전문 팀에 위임하는 구조가 필요했습니다.

### 문제 상황

1. **역할 과부하**: PM이 기획과 구현을 모두 담당하면 품질 저하
2. **전문성 부재**: 코드 작성, 조사, 배포 등 전문 영역이 다름
3. **확장성 한계**: 작업량 증가 시 단일 Agent로 처리 불가
4. **책임 불명확**: 문제 발생 시 누가 담당인지 모호

### 고려한 옵션

**Option A: PM이 모든 작업 직접 수행**
- 장점: 단순함, 맥락 유지
- 단점: 과부하, 전문성 부족

**Option B: 작업 유형별 Agent 분리**
- 장점: 전문화 가능
- 단점: Agent 간 조율 복잡

**Option C: 팀 기반 위임 모델 (선택)**
- PM → 팀 → Agent 구조
- 장점: 확장성, 역할 명확
- 단점: 구조 복잡도 증가

## Decision

**Option C: 팀 기반 위임 모델을 채택한다.**

```
┌─────────────┐
│   AI PM     │  ← 기획, 조율, 추적
└──────┬──────┘
       │ 위임
       ▼
┌──────────────────────────────────┐
│           Teams                   │
├────────────────┬─────────────────┤
│   devteam      │    research     │
│  (구현/배포)    │   (조사/문서)   │
└────────────────┴─────────────────┘
       │                  │
       ▼                  ▼
   Claude Code        Claude Code
   (ai-devteam)       (ai-research)
```

### 팀 구조

| 팀 | 역할 | 저장소 |
|-----|------|--------|
| devteam | 코드 작성, 배포, 기술 구현 | ai-devteam |
| research | 조사, 문서 작성, 분석 | ai-research |

### 위임 원칙

1. **30분 Rule**: 30분 이내 완료 가능한 작업만 위임
2. **Self-Contained**: Issue에 모든 정보 포함
3. **명확한 완료 조건**: 검증 가능한 기준 제시
4. **HITL 체크포인트**: 중요 작업 전후 인간 승인

## Consequences

### 긍정적 결과

- **전문화**: 각 팀이 전문 영역에 집중
- **확장성**: 팀/Agent 추가로 처리량 증가
- **책임 명확**: 문제 발생 시 담당 팀 특정 가능
- **병렬 처리**: 독립 작업은 동시 진행 가능

### 부정적 결과 (주의 필요)

- **오버헤드**: Issue 작성, 결과 확인에 시간 소요
- **컨텍스트 손실**: 팀 간 맥락 전달 어려움
- **의존성 관리**: 팀 간 작업 순서 조율 필요

### 완화 전략

1. **표준 Issue 템플릿**: 일관된 형식으로 맥락 전달
2. **Task Group 스키마**: 병렬/순차 실행 명시
3. **팀 간 호출 규칙**: agent-docs/rules/team-interactions.md

## PM vs 위임 판단 기준

| 판단 요소 | PM 직접 | 팀 위임 |
|----------|---------|---------|
| 작업 시간 | < 5분 | > 5분 |
| 전문성 | 범용 | 특정 도메인 |
| 규모 | 단순 | 복잡/다단계 |
| 예시 | 문서 읽기, 현황 정리 | 코드 구현, 배포, 조사 |

## Related Decisions

- ADR-001: Human-Agent Document Separation
- human-docs/policies/delegation-policy.md

## References

- agent-docs/rules/pm-scope.md
- agent-docs/rules/team-interactions.md
- teams/devteam.yaml
- teams/research.yaml
