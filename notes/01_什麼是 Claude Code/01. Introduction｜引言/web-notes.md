> 譯改寫自《Claude Code in Action》第 01 課

# 01. 引言 Introduction

> 📎 **本課資源**:[skilljar 原版課程頁(影片在此觀看,需登入)](https://anthropic.skilljar.com/claude-code-in-action/303233)

本課為課程的**引言影片**,沒有附文字講義。

> ℹ️ 課程影片鎖在 skilljar 平台(見上方「本課資源」連結,需登入),**本座艙內沒有影片可播**。這課的影片只是課程導覽,不看也完全不影響學習。

重點說明:

- 影片中老師簡要介紹《Claude Code in Action》這門課程的目標與結構。
- 後續各課才會進入實質內容(設定環境、使用 [[claude-md|CLAUDE.md]]、[[hook|Hooks]]、[[mcp-server|MCP Server]] 等)。

## 在本座艙怎麼上這課

不用停留——這課沒有實質內容,**直接跟教練說「開第 2 課」即可**。想先了解全貌的話,可以在聊天面板問「這門課整體會學到什麼?」。

```glossary
{
  "claude-md": {
    "term": "CLAUDE.md — 專案指令檔",
    "short": "放在專案根目錄的 markdown 檔案,Claude Code 每次啟動時會自動讀取,用來設定角色、規則與工作流程。",
    "deeper": "CLAUDE.md 可以放在哪些層級?它與 memory 有什麼差別?"
  },
  "hook": {
    "term": "Hook — 生命週期鉤子",
    "short": "在 Claude Code 執行工具前後自動觸發的 shell 指令,分為 PreToolUse(執行前)與 PostToolUse(執行後)兩類。",
    "deeper": "PreToolUse 可以阻止工具執行嗎?什麼場景下需要用 Hook?"
  },
  "mcp-server": {
    "term": "MCP Server — Model Context Protocol 伺服器",
    "short": "透過標準協定讓 Claude Code 連接外部工具或資料來源的服務,例如 knowledge-graph、gemini-video 都是 MCP server。",
    "deeper": "MCP server 和一般 API 有什麼不同?怎麼在 .mcp.json 設定?"
  }
}
```
