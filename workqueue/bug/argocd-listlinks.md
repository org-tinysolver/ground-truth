# ArgoCD ListLinks API 에러

## 메타
- **유형**: `bug`
- **상태**: `대기`
- **우선순위**: `🔴 높음`
- **담당자**: 
- **작성일**: 2025-12-18

## Why (목적)
ArgoCD 웹 UI 사용성 정상화. Deep Links 기능이 동작해야 팀원들이 애플리케이션 상세 페이지를 정상적으로 활용할 수 있음.

## What (무엇)
- [ ] ListLinks API 500 에러 해결
- [ ] 웹 UI에서 에러 토스트 제거

### 현재 증상
- 에러 메시지: `Unable to load data: error getting destination cluster`
- API: `GET /api/v1/applications/{app-name}/links 500`
- 핵심 기능(sync, deploy, CLI)은 정상 동작

## How (방법)
- [ ] ArgoCD v2.9+ 버전 업그레이드
- [ ] 업그레이드 전 백업 (애플리케이션, RBAC, 클러스터 연결 정보)

### 관련 파일
- Helm chart: `infra-as-code/future-internal-k8s/`
- RBAC 설정: `argocd/dev-aws/rbac-config.yaml`

## Why This Way (선택 이유)
- 현재 버전 v2.7.2에서 ListLinks 관련 버그로 추정
- 패치보다 버전 업그레이드가 장기적으로 안정적
- v2.9+는 해당 이슈가 수정된 버전
