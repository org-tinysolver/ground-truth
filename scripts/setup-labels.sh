#!/bin/bash
# GitHub 라벨 설정 스크립트
# 사용법: ./scripts/setup-labels.sh [repo]
# 예: ./scripts/setup-labels.sh org-tinysolver/ground-truth

set -e

REPO="${1:-org-tinysolver/ground-truth}"

echo "🏷️  Setting up labels for $REPO..."

# 팀 라벨
gh label create "team:pm" --repo "$REPO" --color "0E8A16" --description "AI PM 담당" --force
gh label create "team:dev" --repo "$REPO" --color "1D76DB" --description "AI Dev 담당" --force
gh label create "team:research" --repo "$REPO" --color "5319E7" --description "AI Research 담당" --force

# 핸드오프 라벨
gh label create "handoff:pm→dev" --repo "$REPO" --color "FBCA04" --description "PM이 Dev에게 전달" --force
gh label create "handoff:pm→research" --repo "$REPO" --color "FBCA04" --description "PM이 Research에게 전달" --force
gh label create "handoff:dev→pm" --repo "$REPO" --color "FBCA04" --description "Dev가 PM에게 전달" --force
gh label create "handoff:research→pm" --repo "$REPO" --color "FBCA04" --description "Research가 PM에게 전달" --force
gh label create "handoff:research→dev" --repo "$REPO" --color "FBCA04" --description "Research가 Dev에게 전달" --force

# 상태 라벨
gh label create "ready" --repo "$REPO" --color "0E8A16" --description "작업 시작 가능" --force
gh label create "blocked" --repo "$REPO" --color "D93F0B" --description "블로커 있음" --force
gh label create "human-review" --repo "$REPO" --color "B60205" --description "인간 검토 필요" --force
gh label create "all-hands" --repo "$REPO" --color "B60205" --description "전체 회의 필요" --force

# AI 생성 라벨
gh label create "ai-generated" --repo "$REPO" --color "7057FF" --description "AI가 자동 생성" --force

echo "✅ Labels setup complete!"
