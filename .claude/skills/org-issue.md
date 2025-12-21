# org-tinysolver 이슈 생성 스킬

org-tinysolver 조직의 표준 이슈 생성 프로토콜.

## 사용 시점

- AI 에이전트 간 작업 전달
- 팀 간 핸드오프
- 인간 리뷰 요청
- 전체 회의 소집

## 필수 라벨 규칙

이슈 생성 시 반드시 포함:

1. `team:*` - 담당 팀 (pm/dev/research)
2. 상태 라벨 - ready/blocked/human-review/all-hands
3. `handoff:*→*` - 다른 팀에서 온 경우

## 라벨 목록

### 팀
- `team:pm` - AI PM 담당
- `team:dev` - AI Dev 담당
- `team:research` - AI Research 담당

### 핸드오프
- `handoff:pm→dev` - PM이 Dev에게
- `handoff:pm→research` - PM이 Research에게
- `handoff:dev→pm` - Dev가 PM에게
- `handoff:research→pm` - Research가 PM에게
- `handoff:research→dev` - Research가 Dev에게

### 상태
- `ready` - 작업 시작 가능
- `blocked` - 블로커 있음
- `human-review` - 인간 검증 필요
- `all-hands` - 전체 회의 필요

## 이슈 본문 형식

```markdown
## 요약
[1-2문장 요약]

## 컨텍스트
[왜 필요한지]

## 작업 내용
- [ ] 할 일 1
- [ ] 할 일 2

## 완료 조건
[어떻게 되면 끝인지]
```

## 사용 예시

### PM → Dev 스펙 전달

```bash
gh issue create \
  --repo org-tinysolver/REPO_NAME \
  --title "사용자 인증 기능 구현" \
  --label "team:dev,handoff:pm→dev,ready" \
  --body "## 요약
사용자 인증 기능 구현

## 컨텍스트
MVP에 필요한 핵심 기능

## 작업 내용
- [ ] 로그인 API
- [ ] 세션 관리

## 완료 조건
로그인/로그아웃 동작"
```

### Dev → PM 리뷰 요청

```bash
gh issue create \
  --repo org-tinysolver/REPO_NAME \
  --title "인증 기능 완료 - 리뷰 요청" \
  --label "team:pm,handoff:dev→pm,human-review" \
  --body "..."
```

### 전체 회의 소집

```bash
gh issue create \
  --repo org-tinysolver/REPO_NAME \
  --title "아키텍처 결정 필요" \
  --label "all-hands" \
  --body "..."
```

### 블로커 리포트

```bash
gh issue create \
  --repo org-tinysolver/REPO_NAME \
  --title "외부 API 장애로 작업 중단" \
  --label "team:dev,blocked" \
  --body "..."
```

## Slack 리포트 연동

이슈 생성 후 Slack 리포트 필요 여부:

| 라벨 | Slack | 대기 |
|------|-------|------|
| `human-review` | 필수 | 승인까지 |
| `all-hands` | 필수 | 회의까지 |
| `blocked` | 필수 | 해결까지 |
| `ready` | 선택 | 없음 |
