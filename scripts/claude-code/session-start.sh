#!/bin/bash
# SessionStart Hook: 세션 시작 시 필요한 도구 자동 설치
#
# 목적: Claude Code Web 환경에서 gh CLI 등 필수 도구 자동 설치
# 로컬 환경에서는 건너뜁니다.
#
# 사용법: .claude/settings.json에 hook 등록
# {
#   "hooks": {
#     "SessionStart": [
#       { "hooks": [{ "type": "command", "command": "scripts/claude-code/session-start.sh" }] }
#     ]
#   }
# }

set -e

# Claude Code Web 환경 감지
# 공식 환경변수: CLAUDE_CODE_REMOTE="true"
is_claude_code_web() {
    if [[ "$CLAUDE_CODE_REMOTE" == "true" ]]; then
        return 0
    fi
    return 1
}

# stdin으로 전달된 JSON payload 읽기 (사용하지 않아도 읽어야 함)
INPUT=$(cat)

LOG_FILE="/tmp/session-start-hook.log"
CONTEXT_MESSAGES=()

log() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1" >> "$LOG_FILE"
}

add_context() {
    CONTEXT_MESSAGES+=("$1")
}

# GitHub CLI 버전 (고정)
GH_VERSION="2.62.0"

# GitHub CLI 설치 확인 및 설치
install_gh_cli() {
    # PATH에 ~/.local/bin 추가 (아직 없다면)
    export PATH="$HOME/.local/bin:$PATH"

    if command -v gh &> /dev/null; then
        log "gh CLI already installed: $(gh --version | head -1)"
        return 0
    fi

    log "gh CLI not found, attempting installation..."
    add_context "🔧 Installing GitHub CLI..."

    # OS 감지
    if [[ "$OSTYPE" == "linux-gnu"* ]]; then
        # Linux: 바이너리 직접 다운로드 (sudo 없이)
        log "Detected Linux, installing gh via direct binary..."

        ARCH=$(uname -m)
        if [[ "$ARCH" == "x86_64" ]]; then
            ARCH="amd64"
        elif [[ "$ARCH" == "aarch64" ]]; then
            ARCH="arm64"
        fi

        cd /tmp
        curl -sL "https://github.com/cli/cli/releases/download/v${GH_VERSION}/gh_${GH_VERSION}_linux_${ARCH}.tar.gz" -o gh.tar.gz
        tar -xzf gh.tar.gz
        mkdir -p ~/.local/bin
        mv "gh_${GH_VERSION}_linux_${ARCH}/bin/gh" ~/.local/bin/
        rm -rf gh.tar.gz "gh_${GH_VERSION}_linux_${ARCH}"

        if ~/.local/bin/gh --version &> /dev/null; then
            log "gh CLI installed to ~/.local/bin: $(~/.local/bin/gh --version | head -1)"
            add_context "✅ gh CLI installed. Use: export PATH=\$HOME/.local/bin:\$PATH"
            return 0
        fi

    elif [[ "$OSTYPE" == "darwin"* ]]; then
        # macOS
        if command -v brew &> /dev/null; then
            log "Detected macOS with Homebrew, installing gh..."
            brew install gh 2>> "$LOG_FILE"
            if command -v gh &> /dev/null; then
                log "gh CLI installed via Homebrew"
                add_context "✅ GitHub CLI installed via Homebrew"
                return 0
            fi
        fi
    fi

    log "Failed to install gh CLI"
    add_context "⚠️ Could not auto-install GitHub CLI. Please install manually."
    return 1
}

# 메인 실행
log "=== SessionStart Hook triggered ==="
log "Working directory: $(pwd)"
log "Input payload: $INPUT"

# Claude Code Web 환경에서만 gh CLI 설치 시도
if is_claude_code_web; then
    log "Detected Claude Code Web environment"
    install_gh_cli || true
else
    log "Local environment detected, skipping auto-install"
fi

# 결과 출력 (JSON 형식으로 additionalContext 전달)
if [[ ${#CONTEXT_MESSAGES[@]} -gt 0 ]]; then
    CONTEXT_TEXT=$(printf '%s\n' "${CONTEXT_MESSAGES[@]}")
    # JSON 이스케이프 (macOS/Linux 호환)
    CONTEXT_JSON=$(echo "$CONTEXT_TEXT" | sed 's/"/\\"/g' | tr '\n' ' ')
    echo "{\"additionalContext\": \"$CONTEXT_JSON\"}"
else
    echo "{}"
fi

exit 0
