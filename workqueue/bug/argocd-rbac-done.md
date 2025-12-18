# ArgoCD RBAC 권한 문제

## 메타
- **유형**: `bug`
- **상태**: `완료`
- **우선순위**: `🔴 높음`
- **담당자**: tinysolver
- **작성일**: 2025-12-18
- **완료일**: 2025-12-18

## Why (목적)
admin 계정으로 ArgoCD 애플리케이션 설정 변경이 가능해야 배포 운영이 원활함.

## What (무엇)
- [x] admin 계정 `argocd app set` 명령 권한 부여

## How (방법)
`argocd-rbac-cm` ConfigMap에 admin 권한 매핑 추가:
```yaml
policy.csv: |
  g, admin, role:admin
```

## Why This Way (선택 이유)
- 기존 기본 정책이 `role:readonly`로 되어 있어서 명시적 권한 부여 필요
- admin 계정에는 전체 권한이 적절함
