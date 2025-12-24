# Meeting Log Rules

AI 에이전트가 회의록 작성 시 따라야 할 규칙입니다.

## Quick Reference

| 항목 | 규칙 |
|------|------|
| **저장 위치** | `meetings/YYYY-MM/` |
| **파일명** | `YYYY-MM-DD-{TYPE}-{SEQ}.md` |
| **언어** | 한국어 (기본), 영어 (기술 용어) |
| **템플릿** | `agent-docs/templates/meeting-log.md` |

## Session Types

| Code | Type | When |
|------|------|------|
| `RSC` | Research | 기술 조사, 아키텍처 검토 |
| `DEC` | Decision | 의사결정 완료 시 |
| `PLN` | Planning | 프로젝트/태스크 계획 |
| `REV` | Review | 코드/디자인 리뷰 |
| `BST` | Brainstorm | 아이디어 브레인스토밍 |
| `RET` | Retrospective | 회고 |

## Required Elements

1. **메타데이터**: 날짜, 세션 타입, 참여자
2. **목적**: 해결하려는 질문/목표
3. **핵심 논의**: 주요 발언과 논점
4. **결론**: 도출된 의사결정
5. **액션 아이템**: 후속 작업

## Auto-Suggest Triggers

다음 상황에서 회의록 작성 **자동 제안**:

- ✅ 중요한 의사결정 완료
- ✅ 아키텍처/설계 방향 결정
- ✅ 리서치 결과 도출
- ✅ 30분 이상 긴 논의
- ✅ "기록해줘", "남겨줘", "회의록" 요청

## Suggest Prompt Format

```markdown
---
📝 **회의록 작성 제안**

이 세션에서 중요한 의사결정이 있었습니다.

- **세션 타입**: [추천: DEC/RSC/PLN]
- **주요 내용**: [요약]

> 회의록으로 남기려면 "기록해줘" 또는 "회의록 작성"이라고 말씀해주세요.
---
```

## After Writing

1. `meetings/YYYY-MM/` 에 저장
2. `meetings/README.md` 인덱스 업데이트
3. (선택) HISTORY.md에 링크 추가

