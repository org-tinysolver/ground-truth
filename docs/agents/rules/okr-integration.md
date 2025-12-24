# OKR Integration Rules

Task와 OKR을 연결하여 성과를 추적합니다.

---

## Task 생성 시 필수 확인

1. **어떤 Key Result에 기여하는가?**
   - `objectives/YYYY-QN/objective.yaml` 확인
   - 해당 KR의 `id` 파악 (예: `kr-001`)

2. **현재 진행률은?**
   - `current_value` 확인
   - Task 완료 시 업데이트 필요 여부 판단

3. **Task와 KR 연결**
   - GitHub Issue 제목에 `[KR-XXX]` 태그 포함 권장
   - GitHub Milestone에 연결

---

## Task 완료 시

1. **KR 진행률 업데이트**
   ```yaml
   # objectives/YYYY-QN/objective.yaml
   current_value: [새 값]
   ```

2. **Progress 기록** (주간)
   ```markdown
   # objectives/YYYY-QN/progress.md
   ## Week N
   - [Task 제목] 완료 → KR-XXX [X]% 달성
   ```

---

## Work Hierarchy

```
Organization (org-tinysolver)
└── Project (저장소/서비스)
    └── Objective (분기 목표) - WHY
        └── Key Result (측정 가능한 결과) - WHAT
            └── Task (실행 작업) - HOW
```

---

## 참조

- OKR 정의: `objectives/*/objective.yaml`
- 상세 가이드: `human-docs/guides/work-hierarchy.md`

