@echo off
chcp 65001 >nul
REM ============================================================================
REM  study-coach launcher  (LAN-exposed version)
REM
REM  Same as study-coach.cmd, but exposes the study-web cockpit on the LAN so
REM  other devices (tablet, phone, another PC) on the SAME network can open it.
REM
REM  HOW: sets STUDY_WEB_HOST=0.0.0.0 so the server listens on all interfaces.
REM       On other devices, open  http://<THIS-PC-LAN-IP>:7654
REM       Find this PC's LAN IP with  ipconfig  (look for IPv4, e.g. 192.168.x.x).
REM       The server also prints the URL on startup.
REM
REM  WARNING: study-web has NO authentication. Anyone on the same network can
REM  read your notes / send chat. Use only on a TRUSTED network (home), and
REM  allow the port through Windows Firewall when prompted.
REM  For localhost-only (default, safe) use study-coach.cmd instead.
REM  (Comments are ASCII-only on purpose: cmd.exe misreads non-ASCII .cmd bytes.)
REM ============================================================================
cd /d "%~dp0"
set STUDY_WEB_HOST=0.0.0.0
claude --resume "claude_code_study" --dangerously-load-development-channels server:study-web %*
