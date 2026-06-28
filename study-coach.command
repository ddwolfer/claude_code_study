#!/bin/bash
# study-coach launcher (macOS / Linux) — 《Claude Code in Action》陪讀課程
#
# Launches Claude Code with the study-web browser cockpit loaded as a channel.
# The --dangerously-load-development-channels flag is REQUIRED during the channels
# research preview to load a bare .mcp.json server (study-web) as a channel; plain
# "claude" will NOT push browser messages into the session.
#
# First time: make it executable →  chmod +x study-coach.command
# Then double-click in Finder, or run  ./study-coach.command
#   (若是這個專案第一次啟動、還沒有名為 claude_code_study 的 session,
#    --resume 可能找不到 → 直接先跑一次 `claude` 建立 session 即可。)
# After it starts, open http://127.0.0.1:7654 in your browser.
set -e
cd "$(dirname "$0")"
exec claude --resume "claude_code_study" --dangerously-load-development-channels server:study-web "$@"
