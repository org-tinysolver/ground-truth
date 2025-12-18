# Docker Compose 개발환경 권한 문제 해결

## 메타
- **유형**: `docs`
- **상태**: `완료`
- **우선순위**: `🟡 중간`
- **담당자**: DevOps
- **작성일**: 2024-12-18

## Why (목적)
> Docker Compose로 로컬 개발환경을 구성할 때 호스트와 컨테이너 간 파일 권한 충돌 문제가 발생할 수 있다. 이를 이해하고 올바르게 설정해야 로컬 개발과 Docker 개발을 병행할 수 있다.

## What (무엇)
> 권한 문제의 원인과 해결 방법을 이해한다.

- [x] 권한 문제 원인 파악
- [x] 해결 방법 적용

## How (방법)

### 문제 상황

```bash
# Docker Compose 실행 후 로컬에서 npm install 시도
npm install
# npm error code EACCES
# npm error syscall mkdir
# npm error Error: EACCES: permission denied, mkdir 'node_modules/...'
```

```bash
# 확인해보면 node_modules가 root 소유
ls -la
# drwxr-xr-x  2 root root 4096 ... node_modules
```

### 원인

1. Docker 컨테이너는 기본적으로 **root(UID 0)**로 실행됨
2. 호스트 디렉토리를 볼륨 마운트하면, 컨테이너가 생성하는 파일이 **root 소유**로 호스트에 생성됨
3. 호스트 유저는 root 소유 파일을 수정/삭제할 수 없음

```yaml
# 이렇게 하면 문제 발생
volumes:
  - .:/app  # 전체 마운트 → node_modules가 root로 생성됨
```

### 해결 방법: 소스 파일만 선택적 마운트

**핵심 아이디어**: node_modules를 마운트하지 않으면 호스트에 root 파일이 생기지 않음

```yaml
services:
  docusaurus:
    image: node:20-alpine
    working_dir: /app
    ports:
      - "3100:3000"
    volumes:
      # 소스 파일만 마운트 (node_modules 제외)
      - ./docs:/app/docs
      - ./src:/app/src
      - ./static:/app/static
      - ./package.json:/app/package.json:ro
      - ./docusaurus.config.js:/app/docusaurus.config.js:ro
      - ./sidebars.js:/app/sidebars.js:ro
    environment:
      - NODE_ENV=development
    command: sh -c "npm install && npm run start -- --host 0.0.0.0"
```

### 결과

| 환경 | node_modules 위치 | 소유자 |
|------|-------------------|--------|
| Docker | 컨테이너 내부 `/app/node_modules` | root (컨테이너 전용) |
| 로컬 | 호스트 `./node_modules` | 호스트 유저 |

→ **서로 독립적**이라 충돌 없음!

### 이미 문제가 발생한 경우

```bash
# root 소유 파일 삭제
sudo rm -rf node_modules .docusaurus package-lock.json

# 로컬에서 다시 설치
npm install
npm run start
```

### 대안: user 옵션 사용 (더 복잡함)

```yaml
services:
  app:
    image: node:20-alpine
    user: "1000:1000"  # 호스트 유저의 UID:GID
    ...
```

⚠️ 주의: named volume은 기본적으로 root 소유로 생성되어 추가 설정 필요

## Why This Way (선택 이유)

| 방법 | 장점 | 단점 |
|------|------|------|
| **소스만 마운트 (채택)** | 간단함, 권한 문제 없음 | 로컬/Docker node_modules 별도 관리 |
| user 옵션 | 권한 완전 일치 | named volume 권한 문제, 설정 복잡 |
| 전체 마운트 | 설정 단순 | 권한 충돌 발생 |

**소스만 마운트하는 방식**이 가장 깔끔하고 문제가 적어서 채택.

