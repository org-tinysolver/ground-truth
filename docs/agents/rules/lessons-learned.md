# Lessons Learned (교훈 목록)

> AI agent가 참조할 **결론만** 담은 문서입니다.
> 상세한 배경/원인은 `human-docs/retrospectives/`를 참조하세요.

## 규칙

- 이 문서는 **간결해야 함** (100줄 이내 유지)
- 각 항목은 **Do/Don't** 형식으로 명확하게
- 새 교훈 추가 시 가장 위에 추가
- 오래되거나 무효화된 항목은 아래 Archive로 이동

---

## Active Lessons (현재 적용 중)

### Communication (소통)

| ID | Don't | Do Instead | Source |
|----|-------|------------|--------|
| L010 | Issue 사이징을 "30분 Rule"로 설명 | "독립적 완결성을 가진 최소 작업단위"로 설명. 30분은 휴리스틱일 뿐 | 2025-12-15 |
| L002 | 일반적/모호한 용어 사용 (예: "프로젝트"가 여러 의미) | 밀도 높은 specific 용어 사용 (서비스, 팀 등 구분) | 2025-12-14 |
| L003 | 세션 간 최근 작업 컨텍스트가 공유 안 됨 | 로컬 캐시 파일(RECENT.md)로 최근 활동 간결하게 기록 | 2025-12-14 |
| L006 | 팀 간 위임 문서에서 경로를 `org-tinysolver/...`로 표기 | 항상 `~/org-tinysolver/...` 형식으로 홈 기준 경로 사용 | 2024-12-14 |

### Process (프로세스)

| ID | Don't | Do Instead | Source |
|----|-------|------------|--------|
| L001 | PM이 직접 구현/배포/인프라 작업 수행 | 반드시 devteam/research에게 이슈로 위임 | 2025-12-14 |
| L009 | "빠르게 해달라"는 요청에 PM이 직접 구현 | 속도 요청도 위임하고, Issue로 긴급도 표시 | 2025-12-15 |
| L004 | 이슈 생성 후 보드에 수동 추가 필요 | 이슈 생성 시 자동으로 `gh project item-add` 실행 | 2025-12-14 |
| L005 | 위임 시 기술 스택/구현 방식 지정 | What만 정의, How는 DevTeam 판단에 맡김 | 2024-12-14 |
| L008 | 이슈에 구체적 코드/SQL/구현 방식 포함 | 목표+완료조건만 정의, 구현은 팀 자율 | 2025-12-15 |

### Technical (기술)

| ID | Don't | Do Instead | Source |
|----|-------|------------|--------|
| L007 | PR 머지 시 squash 사용 (히스토리 직선화) | `gh pr merge --merge` 사용하여 머지 그래프 유지 | 2025-12-14 |

### Quality (품질)

| ID | Don't | Do Instead | Source |
|----|-------|------------|--------|
| _아직 없음_ | | | |

---

## Quick Reference (빠른 참조)

자주 발생하는 실수 패턴:

```
⚠️ 이 섹션은 반복되는 실수가 3회 이상 발생 시 추가됩니다.
```

---

## Archive (무효화/해결된 교훈)

> 더 이상 적용되지 않거나, 시스템 개선으로 해결된 교훈들

| ID | 내용 | 무효화 이유 | 날짜 |
|----|------|------------|------|
| _아직 없음_ | | | |

---

## 교훈 추가 가이드

### 항목 형식

```markdown
| LXXX | [하지 말 것] | [대신 할 것] | [YYYY-MM-DD-CAT-keyword](../../human-docs/retrospectives/...) |
```

### ID 규칙

- `L` + 3자리 숫자 (예: L001, L002)
- 순차적으로 증가
- Archive 이동 시에도 ID 유지 (재사용 안 함)

### 예시

```markdown
| L001 | CLAUDE.md에 모든 규칙 나열 | 핵심만 남기고 나머지는 참조 경로로 | [2025-12-13-EFFI-claude-md-length](../../human-docs/retrospectives/2025-12-13-EFFI-claude-md-length.md) |
| L002 | 요구사항 확인 없이 구현 시작 | 먼저 요구사항 명확화 질문 | [2025-12-14-COMM-unclear-req](../../human-docs/retrospectives/2025-12-14-COMM-unclear-req.md) |
```

---

## 관련 문서

- **상세 회고**: `human-docs/retrospectives/`
- **캡처 스킬**: `.claude/skills/learning/capture-lesson.md`
- **적용 스킬**: `.claude/skills/learning/apply-lesson.md`

