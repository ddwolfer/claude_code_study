@echo off
chcp 65001 >nul
REM ============================================================================
REM  study-coach launcher  (Claude Code in Action study course)
REM
REM  Launches Claude Code with the study-web browser cockpit loaded as a channel.
REM  The --dangerously-load-development-channels flag is REQUIRED during the
REM  channels research preview to load a bare .mcp.json server (study-web) as a
REM  channel. Plain "claude" will NOT push browser messages into the session.
REM
REM  First launch of THIS project: if no session named claude_code_study exists
REM  yet, run plain "claude" once to create it, then use this launcher.
REM  After it starts, open http://127.0.0.1:7654 in your browser.
REM  (Comments are ASCII-only on purpose: cmd.exe misreads non-ASCII .cmd bytes.)
REM ============================================================================
cd /d "%~dp0"
claude --resume "claude_code_study" --dangerously-load-development-channels server:study-web %*
