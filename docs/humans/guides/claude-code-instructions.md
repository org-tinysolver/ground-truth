# Claude Code 지침 작성 가이드

AI Agent가 지침을 잘 따르게 하기 위한 베스트 프랙티스입니다.

> 이 가이드는 2024-12 리서치 결과를 바탕으로 작성되었습니다.
> 참고: HumanLayer 블로그, Anthropic 공식 문서, OpenAI AGENTS.md 패턴

---

## 핵심 원칙: Less is More

### Claude Code 시스템의 한계

- Claude Code 시스템 프롬프트에 이미 **~50개 명령**이 포함됨
- Frontier LLM은 약 **150-200개 명령**만 일관되게 따를 수 있음
- **명령이 많을수록 모든 명령이 균일하게 무시됨** (새 명령만 무시되는 게 아님!)

### CLAUDE.md 길이 권장

| 권장 | 최대 | 현재 ai-pm |
|------|------|-----------|
| **60줄 미만** | 300줄 | 57줄 ✅ |

**참고**: HumanLayer는 60줄 미만 사용

---

## Claude가 CLAUDE.md를 무시하는 이유

Claude Code는 내부적으로 다음 시스템 리마인더를 주입:

```
<system-reminder>
IMPORTANT: this context may or may not be relevant to your tasks. 
You should not respond to this context unless it is highly relevant to your task.
</system-reminder>
```

**결론**: CLAUDE.md에는 **모든 작업에 보편적으로 적용되는 규칙만** 포함해야 함

---

## Progressive Disclosure 패턴

### 나쁜 예 (CLAUDE.md에 모든 것 포함)

```markdown
## Issue 생성 규칙
[50줄의 상세 규칙...]

## 회의록 규칙
[40줄의 상세 규칙...]
```

### 좋은 예 (포인터만 포함)

```markdown
## Key References
| When | Read |
|------|------|
| Issue 생성 | agent-docs/rules/issue-sizing.md |
| 회의록 | agent-docs/rules/meeting-log.md |
```

**효과**: Claude는 필요할 때만 해당 파일을 읽어 컨텍스트 절약

---

## CLAUDE.md 구조 권장

### WHY / WHAT / HOW

```markdown
# CLAUDE.md

## Core Rules (WHY - 왜 이렇게 해야 하는가)
- 핵심 원칙 3-5개만

## Key References (WHAT - 무엇을 참조해야 하는가)
| 상황 | 문서 |

## Project Context (HOW - 어떻게 작업하는가)
- 최소한의 기술 스택
- 조직/프로젝트 정보
```

### 포함해야 할 것

- ✅ 모든 작업에 적용되는 핵심 규칙
- ✅ 참조 문서 경로 (포인터)
- ✅ 프로젝트 기본 컨텍스트
- ✅ HITL 필수 상황

### 포함하지 말아야 할 것

- ❌ 코드 스타일 가이드 (린터 사용)
- ❌ 특정 작업에만 필요한 상세 규칙
- ❌ 예시 코드/템플릿 (별도 파일로)
- ❌ 변경 가능한 정보 (버전 등)

---

## 코드 스타일은 린터에게

> **"Never send an LLM to do a linter's job"**

- LLM은 린터보다 느리고 비쌈
- 코드 스타일은 **기존 코드를 보고 자연스럽게 학습**
- 대신 **린터 + 포맷터**를 사용하고, Claude Code Hook으로 자동 실행

---

## 자동생성 금지

> **"CLAUDE.md is the highest leverage point of the harness"**

- `/init` 명령으로 자동생성하지 말 것
- 한 줄 한 줄 신중하게 직접 작성
- 모든 작업에 영향을 미치므로 가장 중요한 파일

---

## 문서 계층 구조

```
CLAUDE.md (60줄 미만)
    │
    ├── OVERVIEW.md (전체 구조 파악용)
    │
    └── agent-docs/
        ├── rules/       (규칙 - 필요시 읽기)
        ├── templates/   (템플릿 - 필요시 읽기)
        └── schemas/     (스키마 - 필요시 읽기)
```

---

## 지침 순응도 테스트

새 규칙 추가 후 테스트:

1. 해당 규칙이 적용되는 상황 시뮬레이션
2. Claude가 규칙을 따르는지 확인
3. 따르지 않으면 규칙 표현 수정 또는 위치 조정

---

## 참고 자료

- [HumanLayer - Writing a good CLAUDE.md](https://humanlayer.dev/blog/writing-a-good-claude-md)
- [Anthropic - Claude Code Best Practices](https://www.anthropic.com/engineering/claude-code-best-practices)
- [OpenAI - AGENTS.md](https://developers.openai.com/codex/guides/agents-md)

---

## 변경 이력

| 날짜 | 변경 내용 |
|------|----------|
| 2024-12-13 | 초안 작성 (리서치 기반) |

