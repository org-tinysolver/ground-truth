# Slack → Claude Code 위임 및 결과 수신

## 메타
- **유형**: `infra`
- **상태**: `진행중`
- **우선순위**: `🔴 높음`
- **담당자**:
- **작성일**: 2025-12-18
- **수정일**: 2025-12-20

## Why (목적)
> 거시적 관점에서 왜 이 일을 해야 하는가?

Slack에서 바로 Claude Code에 작업을 위임하고 결과를 받을 수 있으면, 개발자가 IDE를 떠나지 않고도 AI 지원을 받을 수 있음. 비동기 협업 환경에서 코드 관련 질문/요청을 빠르게 처리 가능.

## What (무엇)
> 무엇을 달성해야 하는가?

- [x] GitHub Actions 빌드/배포 결과를 Slack으로 수신
- [ ] Slack에서 Claude Code로 메시지/작업 위임
- [ ] Claude Code 실행 결과를 Slack 채널/DM으로 수신
- [ ] 기본 명령어 또는 트리거 방식 정의

## How (방법)
> 어떻게 할 것인가?

### Phase 1: GitHub Actions → Slack 알림 (완료)

1. Slack Incoming Webhook 생성
2. GitHub Secrets에 `SLACK_WEBHOOK_URL` 등록
3. `.github/workflows/deploy.yml`에 Slack 알림 추가:
   - 배포 성공 시 알림
   - 빌드/배포 실패 시 알림

### Phase 2: Slack → Claude Code 위임 (예정)

옵션들:
1. **Slack Bot + GitHub Actions workflow_dispatch**
   - Slack 슬래시 커맨드로 GitHub Actions 트리거
   - 결과를 Slack으로 콜백

2. **직접 API 연동**
   - Slack Bot이 Claude API 직접 호출
   - 결과를 Slack으로 응답

## Why This Way (선택 이유)
> 왜 이 방법을 선택했는가? (대안이 있다면 비교)

### Phase 1
- Incoming Webhook이 가장 간단하고 설정이 쉬움
- 별도 서버 없이 GitHub Actions에서 직접 호출 가능
- Block Kit으로 풍부한 알림 UI 제공

### Phase 2 (검토 중)
- workflow_dispatch: 기존 인프라 활용, 추가 비용 없음
- 직접 API: 실시간 응답 가능, 하지만 서버 필요
