# ADR-003: GitHub Project Structure

> **Status**: Accepted
> **Date**: 2025-12-15
> **Deciders**: org-tinysolver

## Context

GitHub에서 이슈 관리를 위한 Project Board 구조를 결정해야 했습니다.

### 문제 상황

1. **중복 관리**: Repository Project와 Organization Project가 별도 존재
2. **자동화 부재**: 이슈 생성 시 보드 추가가 수동
3. **팀 간 가시성**: ai-pm repo의 이슈가 DevTeam 보드에 안 보임

### 고려한 옵션

**Option A: Repository Project 사용**
- 각 repo에 자체 Project Board 생성
- 장점: repo별 독립 관리
- 단점: Organization 전체 뷰 불가, repo간 공유 안됨

**Option B: Organization Project + 수동 추가**
- Org Project만 사용, 이슈 수동 추가
- 장점: 통합 뷰
- 단점: 수동 작업 필요, 누락 가능

**Option C: Organization Project + Auto-add Workflow (선택)**
- Org Project 사용 + Built-in Auto-add로 자동화
- 장점: 통합 뷰, 자동화, repo 기반 분류
- 단점: 초기 설정 필요

## Decision

**Option C: Organization Project + Auto-add Workflow를 채택한다.**

### 핵심 구조

- Repository Project는 사용하지 않음
- Organization Project만 사용
- 각 팀 보드에 Auto-add workflow 설정

### Project Board 구성

| Board | Auto-add Filter | 용도 |
|-------|-----------------|------|
| [TEAM] AI PM | `repo:org-tinysolver/ai-pm is:issue is:open` | PM 작업 |
| [TEAM] DevTeam | `repo:org-tinysolver/ai-devteam is:issue is:open` | 개발 작업 |
| [TEAM] Research | `repo:org-tinysolver/ai-research is:issue is:open` | 리서치 작업 |

### 팀 간 이슈 공유

- 라벨 기반: `team:devteam` 라벨로 다른 보드에서도 필터 가능
- 또는: 해당 팀 repo에 이슈 직접 생성

## Consequences

### 긍정적 결과

- **자동화**: 이슈 생성 시 자동으로 해당 팀 보드에 추가
- **통합 뷰**: Organization 수준에서 전체 현황 파악
- **단순화**: Repository Project 없이 Org Project만 관리

### 부정적 결과 (주의 필요)

- **크로스팀 작업**: ai-pm repo 이슈를 DevTeam이 봐야 할 때 별도 처리 필요
- **초기 설정**: 각 보드에 Auto-add workflow 설정 필요

### 완화 전략

1. **라벨 컨벤션**: `team:devteam` 라벨로 팀 태깅
2. **위임 프로세스**: delegations/ 폴더 + Slack 알림 유지
3. **문서화**: pm-devteam-workflow.md 업데이트

## Related Decisions

- ADR-002: Delegation Model (팀 위임 구조)

## References

- human-docs/guides/pm-devteam-workflow.md
- GitHub Docs: Projects Auto-add workflow

