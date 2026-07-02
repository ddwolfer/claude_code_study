> 譯改寫自《Claude Code in Action》第 20 課

# 第 20 課：Claude Code 測驗

> 📎 **本課資源**:[skilljar 原版課程頁(影片在此觀看,需登入)](https://anthropic.skilljar.com/claude-code-in-action/308391)

這一課是**互動測驗**，原課程平台以線上問答形式呈現，無法以靜態頁面重現。

## 這堂課在做什麼？

本課是對前 19 堂課所學內容的綜合測驗，涵蓋以下主題：

- [[claude-md|CLAUDE.md]] 的用途與優先順序
- [[slash-command|Slash Command]] 的觸發與自訂
- [[mcp-server|MCP Server]] 的設定方式
- [[hook|Hook]]（[[pre-tool-use|PreToolUse]] / [[post-tool-use|PostToolUse]]）的運作流程
- [[sdk|SDK]] 模式與 headless 自動化
- 權限管理與 `allowedTools` 設定

## 如何完成測驗？

兩種方式，可以都做：

- **在本座艙考（推薦先做）**：直接在右側聊天面板跟教練說「**開始測驗**」，教練會不看筆記出 5–8 題涵蓋全課程的綜合題，逐題批改、答錯的帶你回對應講義複習。
- **官方互動測驗**：前往 [skilljar 本課頁面](https://anthropic.skilljar.com/claude-code-in-action/308391)（需登入 Anthropic 帳號）作答原版線上測驗。

## 複習提示

若想先自己暖身，可以自問以下幾題：

1. `CLAUDE.md` 放在哪幾個位置？優先順序為何？
2. Hook 的 `PreToolUse` 與 `PostToolUse` 分別在什麼時機觸發？若 `PreToolUse` 回傳非零，會發生什麼？
3. Slash Command 的定義檔放在哪裡？格式為何？
4. MCP Server 在 `settings.json` 中如何設定？`allowed` / `deny` 清單的用途？
5. SDK 模式（`--print` / `--output-format`）適合什麼場景？

---

```glossary
{
  "claude-md": {
    "term": "CLAUDE.md",
    "short": "放在專案根目錄（或 ~/.claude/）的 Markdown 檔，Claude Code 啟動時自動讀取，作為系統指示或上下文說明。",
    "deeper": "CLAUDE.md 可以放在哪幾個層級？各層級的優先順序是什麼？"
  },
  "slash-command": {
    "term": "Slash Command（斜線指令）",
    "short": "在聊天框輸入 / 開頭的指令，可觸發預定義的提示或流程，定義檔為 .claude/commands/*.md。",
    "deeper": "Slash Command 的 Markdown 定義檔支援哪些 frontmatter 欄位？"
  },
  "mcp-server": {
    "term": "MCP Server（Model Context Protocol 伺服器）",
    "short": "透過標準協定讓 Claude 呼叫外部工具或資源的服務，設定在 settings.json 的 mcpServers 區塊。",
    "deeper": "MCP Server 的 stdio 與 sse 傳輸模式有何差異？"
  },
  "hook": {
    "term": "Hook（鉤子）",
    "short": "Claude Code 在工具呼叫前後執行的自訂腳本，分為 [[pre-tool-use]] 與 [[post-tool-use]]，可用於稽核、阻擋或後處理。",
    "deeper": "Hook 腳本回傳非零退出碼時，Claude Code 會怎麼處理？"
  },
  "pre-tool-use": {
    "term": "PreToolUse Hook",
    "short": "在 Claude 呼叫工具「之前」執行的腳本；若腳本退出碼非零，Claude 會取消該次工具呼叫。",
    "deeper": "PreToolUse 可以用來做哪些安全防護？"
  },
  "post-tool-use": {
    "term": "PostToolUse Hook",
    "short": "在工具呼叫「完成後」執行的腳本，常用於記錄、通知或自動後處理。",
    "deeper": "PostToolUse 無法阻擋工具執行，但可以做哪些事？"
  },
  "sdk": {
    "term": "SDK（Software Development Kit）",
    "short": "Anthropic 提供的程式庫（Python / TypeScript），讓開發者以程式方式驅動 Claude Code，搭配 --print 旗標做 headless 自動化。",
    "deeper": "SDK 的 streaming 模式與一次性 print 模式各適合什麼場景？"
  }
}
```
