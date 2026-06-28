> 譯改寫自《Claude Code in Action》第 01 課

# 01. 引言 Introduction

本課為課程的**引言影片**,沒有附文字講義。

重點說明:

- 影片中老師簡要介紹《Claude Code in Action》這門課程的目標與結構。
- 後續各課才會進入實質內容(設定環境、使用 [[claude-md|CLAUDE.md]]、[[hook|Hooks]]、[[mcp-server|MCP Server]] 等)。

**學習重點在後續課堂的動手操作**,本課以觀看影片為主,無需記筆記。

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
