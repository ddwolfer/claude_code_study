#!/bin/bash
# study-coach launcher (macOS / Linux) — LAN / 區網開放版 · 《Claude Code in Action》
#
# Same as study-coach.command, but exposes the study-web cockpit on the LAN so
# other devices (tablet, phone, another PC) on the SAME network can open it.
#
# HOW: sets STUDY_WEB_HOST=0.0.0.0 so the server listens on all interfaces.
#      On other devices, open  http://<THIS-MAC-LAN-IP>:7654
#      Find this Mac's LAN IP with:  ipconfig getifaddr en0   (Wi-Fi)
#      or System Settings > Network. The server also prints the URL on startup.
#
# WARNING: study-web has NO authentication. Anyone on the same network can read
# your notes / send chat. Use only on a TRUSTED network (home). macOS may prompt
# to allow incoming connections — allow it.
# For localhost-only (default, safe) use study-coach.command instead.
#
# First time: make it executable →  chmod +x study-coach-lan.command
set -e
cd "$(dirname "$0")"
export STUDY_WEB_HOST=0.0.0.0
exec claude --resume "claude_code_study" --dangerously-load-development-channels server:study-web "$@"
