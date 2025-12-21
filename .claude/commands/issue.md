# 이슈 생성

org-tinysolver 표준 프로토콜로 GitHub 이슈를 생성합니다.

## 사용법

```
/issue <type> <title> [repo]
```

## 타입

- `to-dev` - PM/Research → Dev 전달
- `to-pm` - Dev/Research → PM 전달
- `to-research` - PM/Dev → Research 전달
- `review` - 인간 리뷰 요청
- `all-hands` - 전체 회의 소집
- `blocked` - 블로커 리포트

## 예시

```
/issue to-dev "사용자 인증 기능 구현"
/issue review "코드 리뷰 요청"
/issue all-hands "아키텍처 논의 필요"
/issue blocked "외부 API 장애"
```

## 실행

org-issue 스킬을 사용하여 이슈를 생성하세요.
라벨과 본문은 조직 표준에 맞게 자동 설정됩니다.

$ARGUMENTS
