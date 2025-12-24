# Document Rotation Rules

누적되는 문서들의 크기 관리 규칙입니다.

## 대상 문서

| 문서 | 유지 기준 | 아카이브 위치 |
|------|----------|--------------|
| `HISTORY.md` | 최근 5개 Phase | `archive/history/YYYY.md` |
| `meetings/README.md` | 최근 3개월 | 이전은 연도별 섹션 접기 |
| `objectives/*/progress.md` | 현재 분기만 | 분기 종료 시 그대로 유지 (읽기 전용) |

---

## HISTORY.md Rotation

### 유지 항목 (Active)
- **최근 5개 Phase** - 상세 내용 유지
- **Next Steps** - 항상 유지
- **Decision Log** - 최근 15개만 유지

### Rotation Trigger
다음 조건 중 하나 충족 시:
- 파일이 **500줄 초과**
- Phase가 **10개 초과**

### Rotation 절차

```bash
# 1. archive 폴더 확인/생성
mkdir -p archive/history

# 2. 오래된 Phase를 연도별 파일로 이동
# archive/history/2025.md 에 추가
```

### Archive 파일 형식

```markdown
# HISTORY Archive - 2025

이 파일은 2025년의 아카이브된 개발 히스토리입니다.
**읽기 전용** - 수정하지 마세요.

---

## 2025-12-12: Initial Project Setup
[원본 내용 그대로 복사]

## 2025-12-13: Work Hierarchy & OKR System
[원본 내용 그대로 복사]
...
```

### Active HISTORY.md 구조

```markdown
# AI PM Development History

> 이전 기록: [archive/history/2025.md](archive/history/2025.md)

---

## [최신 Phase]
...

## [4번째 최신]
...

## [5번째 최신]
...

---

## Next Steps
[항상 유지]

---

## Decision Log
[최근 15개만]
```

---

## meetings/README.md Rotation

### 유지 항목
- **Quick Links, Session Types** - 항상 유지
- **현재 연도의 최근 3개월** - 상세 테이블 유지
- **이전 월/연도** - 접힌 상태로 링크만 유지

### 형식

```markdown
## 2025

### December
| Date | ID | Type | Title | Participants |
|------|----|------|-------|--------------|
| 12-13 | DEC-001 | ... | ... | ... |

### November
[테이블]

### October
[테이블]

<details>
<summary>📁 이전 기록 (September 이전)</summary>

### September
[테이블]
...
</details>

---

## Archive

<details>
<summary>📁 2024</summary>

[연도별 요약 또는 링크]
</details>
```

---

## objectives/progress.md

### 규칙
- 분기 진행 중: 주차별 업데이트
- 분기 종료 시: 그대로 유지 (수정 금지)
- 새 분기 시작: 새 폴더 생성 (`objectives/2025-Q2/`)

### 아카이브 불필요
- 분기별로 이미 폴더 분리됨
- 이전 분기는 읽기 전용으로 보존

---

## AI Agent 행동 규칙

### Rotation 실행 시점
1. `update-history` 스킬 실행 시 줄 수 체크
2. 500줄 초과 시 rotation 제안
3. Human 승인 후 실행

### 자동 실행 금지
- Rotation은 **HITL 필수**
- 데이터 손실 방지를 위해 Human 확인 후 진행

### Rotation 완료 후
- HISTORY.md 상단에 archive 링크 추가
- 커밋 메시지: `chore: rotate HISTORY.md (archive phases 1-N)`

---

## Quick Reference

```
Rotation Triggers:
├── HISTORY.md: 500줄 초과 OR 10 Phase 초과
├── meetings/README.md: 3개월 초과 시 접기
└── progress.md: 분기 종료 시 동결

Archive Locations:
├── archive/history/YYYY.md
└── (meetings는 같은 파일 내 접기)
```
