# Dev-Ready GitHub Issue Template

Dev Agent가 **이 Issue만 보고 바로 작업 가능**한 형식입니다.

---

## Issue Title Format

```
[{Type}] {구체적인 단일 작업}
```

Examples:
- `[Feature] Hero 섹션에 CTA 버튼 추가`
- `[Bugfix] 모바일에서 네비게이션 메뉴 안 닫히는 문제 수정`
- `[Content] About 섹션 소개 문구 변경`
- `[Style] 버튼 hover 색상 파란색으로 변경`

---

## Dev-Ready Issue Template

```markdown
## 이 Issue에서 해야 할 것

{단 하나의 명확한 작업을 한 문장으로}

---

## 수정할 파일

| 파일 | 변경 내용 |
|------|----------|
| `src/components/Hero.tsx` | CTA 버튼 컴포넌트 추가 |

---

## 구체적인 변경 사항

### 변경 1: {무엇을 어떻게}

**현재 상태:**
```tsx
// 현재 코드 (있으면)
```

**변경 후:**
```tsx
// 이렇게 변경
```

---

## 완료 조건

- [ ] {확인 가능한 조건 1}
- [ ] {확인 가능한 조건 2}
- [ ] 빌드 성공 (`npm run build`)
- [ ] Preview 배포 확인

---

## 메타 정보

| 항목 | 값 |
|------|---|
| **예상 소요** | {5분 / 10분 / 15분 / 20분 / 25분 / 30분} |
| **우선순위** | {P0 / P1 / P2 / P3} |
| **타입** | {feature / bugfix / content / style / refactor} |

---

## 의존성

- **선행 작업**: {없음 / Issue #XX 완료 후 시작}
- **병렬 가능**: {Yes - 다른 작업과 동시 진행 가능 / No}

---

*이 Issue만 보고 작업하세요. 다른 문서 참조 필요 없음.*
```

---

## 예시: 실제 Issue

### Good Example

```markdown
## 이 Issue에서 해야 할 것

Hero 섹션의 메인 타이틀을 "Welcome to TinySolver"로 변경

---

## 수정할 파일

| 파일 | 변경 내용 |
|------|----------|
| `src/components/Hero.tsx` | h1 태그 텍스트 변경 |

---

## 구체적인 변경 사항

### 변경 1: 타이틀 텍스트 변경

**현재 상태:**
```tsx
<h1 className="text-4xl font-bold">Hello World</h1>
```

**변경 후:**
```tsx
<h1 className="text-4xl font-bold">Welcome to TinySolver</h1>
```

---

## 완료 조건

- [ ] Hero 섹션에 "Welcome to TinySolver" 텍스트가 표시됨
- [ ] 빌드 성공 (`npm run build`)
- [ ] Preview에서 변경 확인

---

## 메타 정보

| 항목 | 값 |
|------|---|
| **예상 소요** | 5분 |
| **우선순위** | P3 |
| **타입** | content |

---

## 의존성

- **선행 작업**: 없음
- **병렬 가능**: Yes

---

*이 Issue만 보고 작업하세요. 다른 문서 참조 필요 없음.*
```

---

## Bad Example (이렇게 하면 안 됨)

```markdown
❌ BAD - 이렇게 작성하지 마세요

## Task
랜딩 페이지 개선

## Description
전체적으로 랜딩 페이지를 개선합니다.
자세한 내용은 Figma 디자인을 참고하세요.
기존 코드 스타일 가이드를 따라주세요.

## References
- 디자인: [Figma 링크]
- 스타일 가이드: docs/style-guide.md
- 이전 작업: Issue #5, #6, #7 참고
```

**문제점:**
- 작업 범위 불명확 ("전체적으로 개선")
- 외부 문서 참조 필요 (Figma, 스타일 가이드)
- 구체적인 변경 사항 없음
- 예상 소요 시간 없음
- 완료 조건 불명확

---

## Labels

### Priority
| Label | 색상 | 설명 |
|-------|------|------|
| `p0-critical` | 빨강 | 지금 당장 (production down) |
| `p1-high` | 주황 | 오늘 중 (core 기능) |
| `p2-medium` | 노랑 | 이번 주 (일반 기능) |
| `p3-low` | 초록 | 여유 있을 때 |

### Type
| Label | 설명 |
|-------|------|
| `feature` | 새 기능 |
| `bugfix` | 버그 수정 |
| `content` | 텍스트/콘텐츠 변경 |
| `style` | 디자인/UI 변경 |
| `refactor` | 코드 개선 |

### Workflow
| Label | 설명 |
|-------|------|
| `ready-for-dev` | Dev Agent 작업 가능 |
| `blocked` | 선행 작업 대기 중 |
| `in-progress` | 작업 중 |
| `needs-review` | HITL 리뷰 필요 |

---

## Checklist for PM

Issue 생성 전 확인:

- [ ] 30분 이내 완료 가능한 사이즈인가?
- [ ] 단 하나의 작업만 포함하는가?
- [ ] 수정할 파일이 명확한가?
- [ ] 구체적인 변경 내용이 있는가?
- [ ] 완료 조건이 확인 가능한가?
- [ ] 외부 문서 참조 없이 완결되는가?
- [ ] 의존성이 명시되어 있는가?
