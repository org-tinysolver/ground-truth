# ADR-001: Human-Agent Document Separation

> **Status**: Accepted
> **Date**: 2025-12-14
> **Deciders**: org-tinysolver

## Context

AI Agent와 협업하면서 문서 관리에 대한 명확한 기준이 필요했습니다.

### 문제 상황

1. **컨텍스트 오버로드**: AI가 모든 문서를 매번 읽으면 비효율적
2. **역할 혼란**: 정책 문서와 실행 지침이 섞여 있음
3. **유지보수 어려움**: 변경 시 어느 문서를 수정해야 하는지 불명확
4. **일관성 부재**: 같은 규칙이 여러 곳에 다르게 기술됨

### 고려한 옵션

**Option A: 단일 docs 폴더**
- 모든 문서를 한 곳에
- 장점: 단순함
- 단점: 목적별 구분 어려움, AI 컨텍스트 낭비

**Option B: docs/internal, docs/external 분리**
- 내부용/외부용으로 분리
- 장점: 공개 범위 명확
- 단점: AI 협업 관점이 아님

**Option C: human-docs, agent-docs 분리 (선택)**
- 사용자 기준으로 분리
- 장점: AI 컨텍스트 효율, 역할 명확
- 단점: 문서 동기화 필요

## Decision

**Option C: human-docs와 agent-docs를 분리한다.**

```
human-docs/  → 인간 전용: WHY (왜 이렇게 하는가?)
agent-docs/  → AI 참조: HOW (어떻게 실행하는가?)
```

### 핵심 원칙

1. **human-docs는 Source of Truth**: 모든 정책의 근거
2. **agent-docs는 파생 문서**: human-docs를 기반으로 작성된 실행 지침
3. **AI는 agent-docs만 자동 로드**: 컨텍스트 효율화
4. **human-docs는 필요 시 수동 참조**: `Read` 명령으로 접근

## Consequences

### 긍정적 결과

- **컨텍스트 효율**: AI가 필요한 문서만 로드
- **역할 명확**: 정책(WHY)과 지침(HOW) 분리
- **유지보수 용이**: 변경 영향 범위 명확
- **추적성**: 왜 이런 규칙인지 근거 확인 가능

### 부정적 결과 (주의 필요)

- **동기화 비용**: human-docs 변경 시 agent-docs도 업데이트 필요
- **학습 곡선**: 새 기여자가 구조 이해 필요
- **중복 가능성**: 비슷한 내용이 두 곳에 있을 수 있음

### 완화 전략

1. **변경 관리 프로세스**: human-docs 변경 시 체크리스트로 agent-docs 동기화 확인
2. **문서 템플릿**: 일관된 형식으로 작성
3. **상호 참조**: agent-docs에서 human-docs 원본 링크 제공

## Related Decisions

- ADR-002: Delegation Model (팀 위임 구조)
- standards/document-separation.md (상세 분류 기준)

## References

- human-docs/standards/document-separation.md
- CLAUDE.md (컨텍스트 로드 규칙)
