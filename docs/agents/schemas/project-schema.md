# Project Schema

`projects/*/project.yaml` 파일 스키마 정의입니다.

## Schema Structure

```yaml
# 기본 정보
project:
  id: string          # 고유 식별자 (kebab-case)
  name: string        # 표시 이름
  description: string # 한 줄 설명
  owner: string       # org-tinysolver
  status: string      # active | paused | completed | archived

# 🔥 필수: 왜 이 프로젝트를 하는가?
motivation:
  problem: string     # 해결하려는 문제 (필수)
  why_now: string     # 왜 지금 해야 하는가
  expected_outcome: string  # 완료되면 뭐가 달라지는가
  personal_value: string    # 나한테 왜 중요한가

# 크로스체크 결과
related_check:
  checked_at: date
  similar_projects:
    - id: string
      overlap: string
      difference: string
  decision: string

# 저장소 정보
repository:
  url: string
  default_branch: string
  clone_url: string

# 배포 설정
deployment:
  type: string        # web | cli | native | library
  platform: string    # cloudflare-pages | cloudflare-workers | kubernetes | npm
  url: string
  preview_url_pattern: string
  auto_deploy: boolean
  deploy_branch: string

# 기술 스택
tech_stack:
  framework: string
  language: string
  styling: list
  router: string
  runtime: string

# 빌드 설정
build:
  command: string
  output_dir: string
  node_version: string

# 환경별 URL
environment:
  development:
    url: string
    command: string
  preview:
    url_pattern: string
  production:
    url: string

# 프로젝트 매칭 키워드
keywords: list

# GitHub Projects Board (프로젝트 보드)
board:
  name: string        # 보드 이름 (예: "MerryMatch Board")
  number: number      # 보드 번호
  url: string         # 보드 URL

# HITL 체크포인트
hitl_checkpoints:
  required: list
  optional: list
```

## Status Values

| Status | 의미 |
|--------|------|
| `active` | 현재 진행 중 |
| `paused` | 일시 중단 |
| `completed` | 완료 (유지보수 모드) |
| `archived` | 보관 (관리 안 함) |

## Deployment Types

| Type | Platform Options |
|------|-----------------|
| `web` | cloudflare-pages, cloudflare-workers, kubernetes |
| `cli` | npm |
| `native` | binary release |
| `library` | npm, pypi |

## New Project Checklist

1. [ ] `motivation.problem` 작성 (필수)
2. [ ] `related_check` 크로스체크 수행
3. [ ] `keywords` 설정
4. [ ] `hitl_checkpoints` 설정

## Example

```yaml
project:
  id: tinysolver-me
  name: TinySolver.me
  description: Personal branding website
  owner: org-tinysolver
  status: active

motivation:
  problem: |
    개인 브랜딩과 포트폴리오를 보여줄 전문적인 웹사이트가 없음
  why_now: |
    프리랜서 활동 본격화 시점
  expected_outcome: |
    전문적인 첫인상 제공, 포트폴리오 공유 채널 확보

repository:
  url: https://github.com/org-tinysolver/tinysolver.me
  default_branch: main

deployment:
  type: web
  platform: cloudflare-pages
  url: https://tinysolver.me

keywords:
  - tinysolver
  - homepage
  - landing
  - personal
```

