# 블로커 리포팅 규칙

> 작업 중 블로커/실패 발생 시 자동으로 Slack에 리포팅

## 핵심 원칙

1. **즉시 보고**: 블로커 감지 즉시 사용자에게 알림
2. **해결 방안 제시**: 가능한 해결책 2-3개 제안
3. **선택지 제공**: 사용자가 방향 결정
4. **파일 기록**: `blockers/` 폴더에 기록 → Slack 자동 알림

---

## 블로커 감지 조건

### 자동 감지 대상

| Trigger | Example |
|---------|---------|
| Hook 차단 | `check-branch.sh`에서 main 브랜치 코드 변경 차단 |
| 권한 부족 | `Permission denied`, GitHub push 실패 |
| 의존성 문제 | `npm install` 실패, 버전 충돌 |
| 시간 초과 | 명령어 timeout |
| 네트워크 오류 | API 호출 실패, fetch 오류 |
| 실행 실패 | 빌드 실패, 테스트 실패 |

### 감지 키워드

```
- "permission denied"
- "access denied"
- "cannot modify"
- "hook failed"
- "blocked by"
- "timeout"
- "ERESOLVE"
- "fatal:"
- "error:"
- "failed to"
```

---

## 리포팅 흐름

```
블로커 감지
    │
    ▼
즉시 사용자에게 알림 (대화창)
├── 🚨 문제 설명
├── 📋 시도한 것
├── 💡 가능한 해결책 (2-3개)
└── ❓ 어떻게 할지 질문
    │
    ▼
사용자 응답 대기
├── "1번" / "첫 번째" → 해당 방안 실행
├── "직접 해결할게" → 대기
├── "기록해" → blockers/ 파일 생성
└── 다른 지시 → 따름
```

---

## 심각도 레벨

| Level | Emoji | 조건 |
|-------|-------|------|
| `high` | 🚨 | 작업 완전 중단, Human 필수 |
| `medium` | ⚠️ | 우회 가능, 결정 필요 |
| `low` | ℹ️ | 경고성, 진행 가능 |

### 심각도 판단 기준

**High (🚨)**:
- 권한/인증 문제
- 보호된 브랜치 위반
- 인프라/배포 실패
- 데이터 무결성 위험

**Medium (⚠️)**:
- 의존성 충돌
- 빌드 실패
- 테스트 실패
- 설정 누락

**Low (ℹ️)**:
- 경고 메시지
- deprecated 사용
- 스타일 위반

---

## 카테고리

| Category | Description | 예시 |
|----------|-------------|------|
| `hook` | Hook 차단 | 브랜치 보호 위반 |
| `permission` | 권한 부족 | git push 실패, 파일 접근 불가 |
| `dependency` | 의존성 | npm/pip install 실패 |
| `timeout` | 시간 초과 | 명령어 실행 timeout |
| `network` | 네트워크 | API 호출 실패 |
| `build` | 빌드/컴파일 | tsc, webpack 실패 |
| `test` | 테스트 | jest, pytest 실패 |
| `other` | 기타 | 분류 불가 |

---

## 파일 형식

**경로**: `blockers/YYYY-MM-DD-{category}-{key}.md`

**예시**: `blockers/2025-12-14-hook-branch-protection.md`

```markdown
---
status: blocked | resolved | bypassed
severity: high | medium | low
category: hook | permission | dependency | timeout | network | build | test | other
date: YYYY-MM-DD
time: HH:MM:SS
project: "project-name"
---

# {블로커 제목}

## 문제
{무엇이 막혔는지}

## 에러
```
{에러 메시지}
```

## 원인
{추정 원인}

## 시도한 것
1. {시도 1}
2. {시도 2}

## 해결 방안
- [ ] 방안 1: {설명}
- [ ] 방안 2: {설명}
- [ ] 방안 3: {설명}

## 선택된 방안
{사용자가 선택한 방안 또는 "대기 중"}

## 결과
{해결됨/우회됨/대기 중}
```

---

## Slack 알림 형식

### High (🚨)
```
🚨 블로커 발생: {제목}
━━━━━━━━━━━━━━━━
{문제 요약}

카테고리: {category}
심각도: High

> Human 개입 필요
[상세 보기]
```

### Medium (⚠️)
```
⚠️ 블로커 발생: {제목}
━━━━━━━━━━━━━━━━
{문제 요약}

해결 방안이 제안되었습니다.
[상세 보기]
```

### Low (ℹ️)
```
ℹ️ 경고: {제목}
{문제 요약}
[상세 보기]
```

---

## 대화창 알림 형식

블로커 감지 시 즉시 사용자에게 표시:

```markdown
---
🚨 **블로커 발생**

**문제**: {문제 설명}

**에러**:
> {에러 메시지 요약}

**가능한 해결책**:
1. {방안 1} - {설명}
2. {방안 2} - {설명}
3. {방안 3} - {설명}

어떻게 진행할까요? (번호로 선택하거나 다른 지시를 해주세요)
---
```

---

## 관련 파일

- 스킬: `.claude/skills/session/report-blocker.md`
- 워크플로우: `.github/workflows/notify-blocker.yml`
- 슬랙 규칙: `agent-docs/rules/slack-notifications.md`
