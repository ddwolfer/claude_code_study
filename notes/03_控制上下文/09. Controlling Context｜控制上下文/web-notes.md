> 譯改寫自《Claude Code in Action》第 09 課

# 09 · 控制上下文 (Controlling Context)

處理複雜任務時，長對話容易累積大量無關資訊，讓 Claude 走偏或重複犯錯。本課介紹四種保持對話專注的實用技巧。

---

## 1. 用 `Esc` 中斷 Claude

當 Claude 開始偏離方向、或一次性處理太多任務時，隨時可以按 **`Esc`** 鍵中斷目前回應。

**典型場景：**

你請 Claude 為多個函式寫測試，它卻開始規劃整套測試架構 → 按 `Esc` 中斷，然後把範圍縮小到「先寫一個函式的測試」。

---

## 2. `Esc` + [[memory|記憶]] 組合：修正重複性錯誤

`Esc` 最強大的用途之一是搭配 `#` 記憶功能，一次性糾正壞習慣：

1. 按 `Esc` 停止目前回應
2. 輸入 `#` 加上正確的做法，存進 [[memory|記憶]]
3. 繼續對話，Claude 就會按新記憶執行

這樣可避免 Claude 在未來對話中重複同樣的錯誤。

---

## 3. 回退對話 (Conversation Rollback)

長對話容易積累大量無關[[context-window|上下文]]（例如除錯過程對下一個任務毫無用處）。此時可以按兩次 `Esc` 執行「回退對話」：

- **保留**有價值的上下文（例如 Claude 對程式庫的理解）
- **刪除**無用或干擾性的對話片段
- 讓 Claude 重新專注於當前任務

---

## 4. 上下文管理[[slash-command|指令]]

Claude Code 提供兩個專門管理[[context-window|上下文]]的[[slash-command|斜線指令]]：

### `/compact` — 壓縮並保留精華

[[compact-command|`/compact`]] 會把整段對話**摘要**成關鍵要點，再繼續對話。

**適用時機：**
- Claude 已學習到專案的重要資訊
- 你要繼續相關任務，但希望[[context-window|上下文]]更短
- 對話變長、但仍有有價值的資訊需要保留

### `/clear` — 完全清空，從頭開始

[[clear-command|`/clear`]] 會**清空所有**對話上下文。

**適用時機：**
- 切換到與目前任務完全無關的新任務
- 舊[[context-window|上下文]]可能干擾新任務
- 需要徹底重來

---

## 5. 何時使用這些技巧

| 情境 | 建議做法 |
|------|----------|
| Claude 偏離方向或處理太多事 | 按 `Esc` 中斷，重新聚焦 |
| Claude 重複犯相同的錯誤 | `Esc` + `#` 新增[[memory]] |
| 對話過長但仍有部分有用 | [[compact-command]] 壓縮 |
| 完全切換到不相關的新任務 | [[clear-command]] 清空 |
| 除錯上下文污染後續任務 | 按兩次 `Esc` 回退對話 |

---

## 核心觀念

> 這些不是小技巧，而是高品質 AI 開發會話的基礎能力。
> 靈活使用 `Esc`、回退、[[compact-command|`/compact`]] 與 [[clear-command|`/clear`]]，能讓 Claude 在整個開發流程中保持高效與專注。

```glossary
{
  "context-window": {
    "term": "Context Window / 上下文視窗",
    "short": "Claude 每次回應時「看得到」的對話歷史範圍。視窗越長，包含的資訊越多，但也越容易混入無關雜訊、佔用 token。",
    "deeper": "為什麼上下文過長會讓模型走偏？/compact 和 /clear 各自保留了哪些資訊？"
  },
  "memory": {
    "term": "Memory / 記憶 (# 指令)",
    "short": "在 Claude Code 中輸入 # 開頭的訊息，可以把重要規則或偏好存進持久記憶，讓 Claude 在未來對話中都遵守。",
    "deeper": "記憶存在哪裡？什麼時候該用 # 記憶，什麼時候該寫進 [[claudemd]]？"
  },
  "slash-command": {
    "term": "Slash Command / 斜線指令",
    "short": "在 Claude Code 輸入框輸入 / 開頭的特殊指令，用來觸發內建功能，例如 /compact、/clear、/help 等。",
    "deeper": "除了內建指令，還可以自訂斜線指令嗎？"
  },
  "compact-command": {
    "term": "/compact 指令",
    "short": "把目前對話壓縮成摘要並繼續，保留關鍵資訊、縮短 [[context-window]]。適合對話變長但不想完全重來的情況。"
  },
  "clear-command": {
    "term": "/clear 指令",
    "short": "完全清空 [[context-window]]，從零開始新對話。適合任務切換、或舊上下文會干擾新任務時。"
  },
  "claudemd": {
    "term": "CLAUDE.md",
    "short": "放在專案根目錄的 Markdown 設定檔，Claude Code 每次啟動都會自動讀取，用來設定專案規則、偏好與上下文。",
    "deeper": "CLAUDE.md 和 # 記憶有什麼差別？什麼資訊應該放哪裡？"
  }
}
```
