> 譯改寫自《Claude Code in Action》第 04 課

# 04. Claude Code 安裝與配置

> 📎 **本課資源**:[skilljar 原版課程頁(影片在此觀看,需登入)](https://anthropic.skilljar.com/claude-code-in-action/301614)

本課是純動手安裝課,重點在本地環境準備。完整官方說明見：
[https://code.claude.com/docs/en/quickstart](https://code.claude.com/docs/en/quickstart)

---

## 安裝 [[claude-code]]

依據你的作業系統,選擇對應的安裝指令：

### macOS（Homebrew）

```bash
brew install --cask claude-code
```

### macOS / Linux / WSL

```bash
curl -fsSL https://claude.ai/install.sh | bash
```

### Windows CMD

```bat
curl -fsSL https://claude.ai/install.cmd -o install.cmd && install.cmd && del install.cmd
```

---

## 首次啟動與認證

安裝完成後,在終端機執行：

```bash
claude
```

首次執行會提示你進行帳號認證（登入 Anthropic 帳號）。認證完成後即可開始使用。

---

## 企業雲端後端配置（選用）

若你的組織透過 [[aws-bedrock]] 或 [[google-vertex]] 存取 Claude，需要額外配置：

| 後端 | 說明文件 |
|------|----------|
| [[aws-bedrock]] | https://code.claude.com/docs/en/amazon-bedrock |
| [[google-vertex]] | https://code.claude.com/docs/en/google-vertex-ai |

---

> 這一課屬於純安裝引導，沒有投影片概念講解。裝好後就能進入後續課程的實作練習。

```glossary
{
  "claude-code": {
    "term": "Claude Code",
    "short": "Anthropic 官方的 CLI 工具，讓你在終端機裡直接與 Claude 模型互動、操作檔案與執行指令。",
    "deeper": "Claude Code 和一般聊天介面有什麼不同？它多了哪些能力？"
  },
  "aws-bedrock": {
    "term": "AWS Bedrock",
    "short": "Amazon 的代管 AI 模型服務，企業可透過 Bedrock 呼叫 Claude，資料留在自己的 AWS 帳號內。",
    "deeper": "什麼情況下企業會選 Bedrock 而非直接用 Anthropic API？"
  },
  "google-vertex": {
    "term": "Google Cloud Vertex AI",
    "short": "Google Cloud 的 AI 平台，同樣支援代管 Claude 模型，適合已在 GCP 生態系的團隊。",
    "deeper": "Vertex AI 與 AWS Bedrock 的授權/計費方式有何差異？"
  }
}
```
