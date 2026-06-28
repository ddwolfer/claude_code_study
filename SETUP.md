# SETUP — 在新機器跑起來

這套陪讀系統 = 一個 Claude Code 專案 + 3 個本地 MCP server(`kg` 知識圖譜、`study-web` 網頁座艙、`mcp-gemini-video` 本課程閒置)。`git clone` 後需要幾個手動步驟,因為原生套件不進 git。

> 懶人驗證:做完下面步驟,在專案根目錄跑 **`node scripts/check-setup.mjs`**,它會逐項 ✅/⚠️/❌ 告訴你還缺什麼。或直接 `claude` 進來問「**驗證我的設定**」。

---

## 前置需求
- **Node.js 18+**(建議 20 LTS) — 三個 server 都是 Node。
- **Claude Code CLI** 已安裝、且用 claude.ai 或 Console API key 登入(channels 不支援 Bedrock/Vertex)。
- **git**。

## 步驟

### 1. Clone
```bash
git clone <repo-url> claude-code-study
cd claude-code-study
```

### 2. 安裝相依套件(★ 必須在這台機器上跑 ★)
`node_modules/` 沒進 git,且 `kg` 用到**原生編譯**套件(`better-sqlite3`、`sqlite-vec`)——不能把別台機器的 `node_modules` 複製過來。各自安裝:
```bash
cd kg && npm install && cd ..
cd study-web && npm install && cd ..
cd mcp-gemini-video && npm install && cd ..   # 選用:本課程用不到 Gemini
```
> `kg` 首次會用 `@huggingface/transformers` 下載 ~560MB embedding 模型(要等、需網路);機器內快取一次,之後共用。

### 3.（選用)Gemini API key
**本課程是純文字 HTML,Claude 直接讀,用不到 Gemini** → 這步可略過。`check-setup` 只會給 ⚠️ 不是 ❌。
(只有要拿 Gemini 看其它課的影片/PDF 才需要 `export GEMINI_API_KEY=...`。)

### 4. 課程素材(已在 repo,免下載)
跟系統設計課不同,本課程素材(純文字、公開中譯、~77KB)**已隨 git 一起 clone**:
- `course/` — cholf5 原始 21 課 HTML。
- `Claude Code 實戰_課程講義/` — 章/課素材樹(座艙掃描用)。
- `notes/<模組>/<課>/digest.md` — 逐字快取。

若課程素材樹不見了(或想重萃),跑:
```bash
node scripts/extract-course.mjs
```

### 5. 信任 MCP server(避免座艙卡在權限詢問)
首次啟動 Claude Code 會逐一問是否信任三個 server,按「同意」即可;或建 `.claude/settings.local.json` 預先信任:
```json
{ "enabledMcpjsonServers": ["knowledge-graph", "study-web", "gemini-video"] }
```

### 6. 啟動
- **macOS / Linux**:第一次先 `chmod +x study-coach.command`,之後雙擊或 `./study-coach.command`。
  - 第一次啟動若還沒有名為 `claude_code_study` 的 session,`--resume` 可能找不到 → 先跑一次 `claude` 建立 session 即可。
- **Windows**:`study-coach.cmd`。
- 啟動後開瀏覽器 **http://127.0.0.1:7654**。
- 區網分享(平板/手機)用 `study-coach-lan.command` / `.cmd`(⚠️ 無驗證,只在可信家用網路用)。
- 只想純文字複習、不用網頁,直接 `claude` 即可。

---

## 哪些東西「會 / 不會」跟著 git 走

| 項目 | 進 git? | 說明 |
|---|---|---|
| 程式碼、skills、CLAUDE.md | ✅ | 正常追蹤 |
| **`kg/claude-code.db`(你學到的知識)** | ✅ | 複習/考問在新機器立刻可用;用 `scripts/sync-kg.mjs` 推送 |
| `course/`、`Claude Code 實戰_課程講義/`、`notes/` | ✅ | 課程素材小且公開,隨 repo 走 → clone 後座艙即可用 |
| `node_modules/` | ❌ | 各機器 `npm install`(原生套件要本機編譯) |
| `GEMINI_API_KEY` / `.env` | ❌ | 本課程用不到;要設也是手動 |
| `.claude/settings.local.json` | ❌ | 本機信任清單 |
| `study-web/state.json` | ❌ | 座艙執行期狀態(最後一課 + 聊天),本機 |

---

## 驗證
```bash
node scripts/check-setup.mjs
```
沒有 ❌ 就能上課。⚠️ 多半是 Gemini key(可略)或 chmod。

---

## hook 路徑備忘（已修好,給好奇者)
KG hook 的 DB 參數在 `.claude/settings.json` 傳的是 `"claude-code.db"`(hook 內部解析成 `kg/claude-code.db`,基準是 `kg/`);`.mcp.json` 的 server 傳 `"kg/claude-code.db"`(基準是專案根)。同一顆 DB、兩套基準,本專案已對齊 —— 母專案 study-coach 曾因兩者搞混導致 hook 靜默失效(`kg/kg/...`),此處不存在。
