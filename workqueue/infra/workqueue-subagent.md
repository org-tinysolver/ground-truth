# Workqueue 관리 Subagent 구축

## 메타
- **유형**: `infra`
- **상태**: `대기`
- **우선순위**: `🟡 중간`
- **담당자**: 
- **작성일**: 2024-12-18

## Why (목적)
> Workqueue 관리 작업(생성, 상태변경, 완료처리, 조회)을 매번 수동으로 하기 번거롭다. 이를 전담하는 subagent에게 위임하면 일관된 형식과 규칙을 자동으로 적용할 수 있다.

## What (무엇)
> `/manage-work-queue` 명령어를 처리하는 전용 subagent 생성

- [ ] Subagent 설정 파일 생성 (`.cursor/agents/` 또는 유사 구조)
- [ ] 명령어 지침 연동 (`.cursor/commands/manage-work-queue.md`)
- [ ] 작업 CRUD 기능 구현
  - [ ] 새 작업 생성
  - [ ] 상태 변경
  - [ ] 완료 처리 (`-done` 접미사)
  - [ ] 목록 조회
- [ ] 테스트

## How (방법)
> Cursor/Claude의 agent 시스템 활용

1. **Agent 정의 파일 생성**
   - 역할: Workqueue 관리 전담
   - 참조 문서: `launchpad/workqueue/README.md`, `work-template.md`
   - 명령어: `.cursor/commands/manage-work-queue.md`

2. **권한 범위**
   - 읽기: `launchpad/workqueue/**/*.md`
   - 쓰기: `launchpad/workqueue/**/*.md` (README, template 제외)
   - 파일명 변경: `-done` 접미사 추가

3. **동작 흐름**
   ```
   사용자 요청 → 유형 판단 → 해당 폴더에 파일 생성/수정 → 결과 보고
   ```

## Why This Way (선택 이유)
> 메인 에이전트가 모든 작업을 하면 컨텍스트가 커지고 실수 가능성 높음. 단일 책임 원칙에 따라 workqueue 전담 subagent를 분리하면:
> - 일관된 형식 유지
> - 규칙 위반 방지 (완료 시 -done 누락 등)
> - 메인 에이전트 부담 감소

