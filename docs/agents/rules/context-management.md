# Context Management Rules

Claude Code의 컨텍스트 윈도우를 효율적으로 사용하기 위한 규칙입니다.

---

## 문서 길이 제한

| 문서 유형 | 권장 길이 | 최대 한계 | 비고 |
|----------|----------|----------|------|
| **CLAUDE.md** | **~60줄** | 100줄 | 핵심만, 참조 경로 포함 |
| OVERVIEW.md | 200-400줄 | 500줄 | 전체 구조 파악용 |
| agent-docs/* | 50-100줄 | 200줄 | HOW 중심, 간결하게 |
| Skills/Commands | 30-50줄 | 100줄 | 단일 책임 |

### 왜 60줄인가?

**리서치 결과** (2024-12):
- Claude Code 시스템에 이미 ~50개 명령 포함
- Frontier LLM은 150-200개 명령만 일관되게 따름
- **명령이 많을수록 모든 명령이 균일하게 무시됨**
- HumanLayer는 60줄 미만 사용

### 위반 시 문제
- 100줄 초과: 순응도 저하 시작
- 300줄 초과: 뒷부분 무시 위험
- 500줄 초과: 거의 무시됨

---

## Progressive Disclosure

### 원칙
```
CLAUDE.md = 핵심 규칙 + 참조 경로
상세 내용 = 별도 파일로 분리
```

### 올바른 패턴

```markdown
# CLAUDE.md에서
## Rules
- Issue 생성 규칙: agent-docs/rules/issue-sizing.md 참조
- 회의록 규칙: agent-docs/rules/meeting-log.md 참조
```

### 잘못된 패턴

```markdown
# CLAUDE.md에 전부 포함 (X)
## Issue 생성 규칙
[50줄의 상세 규칙...]

## 회의록 규칙
[40줄의 상세 규칙...]
```

---

## Lazy Loading 지시

### Skills/Commands에서 참조 파일 읽기

```markdown
# skill.md 예시
## 실행 시
1. `agent-docs/templates/github-issue.md` 읽기
2. 템플릿에 따라 Issue 생성
```

AI가 필요한 시점에만 파일을 읽어 컨텍스트 절약.

### 조건부 로딩

```markdown
## When
- 리포트 작성 시 → agent-docs/templates/report.md 읽기
- 코드 작업 시 → 해당 프로젝트의 conventions.md 확인
```

---

## 컨텍스트 관리 전략

### 1. 문서 분리 (Document Separation)
```
human-docs/  → 인간 전용 (AI 접근 차단)
agent-docs/  → AI 참조용 (간결하게)
```

### 2. 파일 참조 시 경로 명시
```markdown
자세한 내용은 `agent-docs/rules/issue-sizing.md:15-30` 참조
```

### 3. 긴 대화 시 /compact 사용
- 컨텍스트 오버플로우 방지
- 핵심 정보만 유지

---

## AI Agent 행동 규칙

### 문서 작성 시
1. 권장 길이 확인 (100-200줄)
2. 초과 시 분리 검토
3. Progressive Disclosure 적용

### 문서 읽기 시
1. 전체 로드 대신 필요 부분만
2. 참조 파일은 작업 시점에 읽기
3. 큰 파일은 offset/limit 활용

---

## Quick Reference

```
길이 제한:
├── CLAUDE.md: ~60줄 권장, 100줄 최대 ⚠️ 가장 중요
├── OVERVIEW.md: ~300줄 권장, 500줄 최대
├── Rules/Templates: ~100줄 권장, 200줄 최대
└── Skills/Commands: ~50줄 권장, 100줄 최대

패턴:
├── Progressive Disclosure: 핵심만 + 참조 경로
├── Lazy Loading: 필요 시점에 읽기
└── Document Separation: human-docs vs agent-docs

핵심 원칙:
├── Less is More: 명령이 적을수록 순응도 높음
├── Universal Rules Only: 모든 작업에 적용되는 것만 CLAUDE.md에
└── Linter for Style: 코드 스타일은 CLAUDE.md에 넣지 말 것
```

## 참고

상세 가이드: `human-docs/guides/claude-code-instructions.md`
