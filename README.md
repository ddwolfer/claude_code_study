# 《Claude Code in Action》陪讀課程 (Study Coach)

一個自足的 **Claude Code 學習專案**:把 Anthropic 官方課程 **《Claude Code in Action》**(21 課)的內容,經陪讀討論後寫進一個持久的 knowledge graph (`kg/claude-code.db`),日後可 merge 進任何工作專案。

這個專案是用姊妹專案「系統設計陪讀教練」**原樣全搬**改編而來 —— 同一套 KG 引擎 + study-web 瀏覽器座艙 + 教學迴圈。最大差異:**課程素材是純文字 HTML,Claude 直接讀得懂,不需要 Gemini 的眼睛**。

> 教練人設、信任規則、KG 流程、間隔複習的權威版本在 **`CLAUDE.md`**。

---

## 內容物

| 路徑 | 是什麼 |
|---|---|
| `.mcp.json` | 三個 MCP server:`knowledge-graph`(`kg/claude-code.db`)、`study-web`、`gemini-video`(原樣保留但本課程閒置)。 |
| `.claude/settings.json` | 5 個 KG hook(開場複習、compact 重灌、auto-recall、search-enforcer、web-reply 防呆)。 |
| `CLAUDE.md` | 陪讀教練人設 + 每課流程。 |
| `kg/` | knowledge-graph 引擎(13 工具、向量+FTS 混合搜尋、記憶衰減/間隔複習)。 |
| `kg/claude-code.db` | 你學到的知識(KG)。`domain:'claude-code'`,可獨立 merge。 |
| `study-web/` | 瀏覽器座艙(三面板:章節導航 / 可點網頁筆記 / 聊天)。 |
| `course/` | cholf5《Claude Code in Action》中文版的原始 clone(21 課 HTML;上游真相)。 |
| `Claude Code 實戰_課程講義/` | 章/課課程素材樹(座艙的課程目錄掃這棵)。由 `scripts/extract-course.mjs` 產生。 |
| `notes/<模組>/<課>/digest.md` | 逐字原文快取(**上課讀這份**)。 |
| `notes/<模組>/<課>/web-notes.md` | 重寫的可點網頁筆記(給座艙閱讀面板)。 |
| `scripts/extract-course.mjs` | 把 `course/` 的 HTML 萃取成雙樹(digest + 課程素材樹)。 |
| `scripts/check-setup.mjs` | 跨機器設定驗證器(✅/⚠️/❌)。 |
| `scripts/sync-kg.mjs` | checkpoint KG WAL → commit `kg/claude-code.db` → push,讓別台機器拿到。 |
| `study-coach.command` / `.cmd` | 啟動器(macOS / Windows;LAN 版另有 `-lan`)。 |

---

## 快速開始

```bash
# 1) 安裝三個子套件的相依(原生模組要在本機編譯)
cd kg && npm install && cd ..
cd mcp-gemini-video && npm install && cd ..   # 選用:本課程用不到 Gemini
cd study-web && npm install && cd ..

# 2) 驗證
node scripts/check-setup.mjs

# 3) 啟動(macOS;第一次先 chmod +x)
chmod +x study-coach.command
./study-coach.command
#   → 開瀏覽器 http://127.0.0.1:7654
```

> 若只想純文字複習、不要網頁座艙,直接 `claude` 即可(KG 仍可用)。

---

## 課程結構（21 課 / 5 模組）

1. **什麼是 Claude Code**(01–03)— 引言、編碼助手、Claude Code 實戰
2. **動手實作**(04–08)— 安裝配置、專案準備、加上下文、進行修改、滿意度調查
3. **控制上下文**(09–12)— 控制上下文、自訂命令、MCP 伺服器、GitHub 整合
4. **Hooks 與 SDK**(13–19)— 認識/定義/實作 Hooks、坑點、實用 Hooks×2、SDK
5. **收尾**(20–21)— 測驗、總結與下一步

> 影片鎖在 skilljar(需登入),本專案只含文字講義 + 截圖(熱連結自課程公開 S3)。每課 digest 開頭有英文原版連結。

---

## 這顆 DB 是人才庫 master

`kg/claude-code.db` 不是拋棄式的。上完一個主題後,它就是可「招募」進任何工作專案的 domain master:

```bash
# 從引擎目錄;merge 前先停掉本專案的 knowledge-graph MCP server(關掉 claude)
node kg/scripts/merge-db.js --into team.db --from kg/claude-code.db --tag-domain
```

`--tag-domain` 把每個複製節點的 `metadata.domain` 標成來源檔名;merge 冪等(UUID 去重),重跑安全。

---

## 來源與致謝

- 課程原版(英文,需登入):<https://anthropic.skilljar.com/claude-code-in-action>
- 中文翻譯(本專案素材來源):<https://github.com/cholf5/claude-code-in-action>(社群中譯,公開 repo)

課程內容版權屬 Anthropic / 原作者;本專案僅作個人學習用途。
