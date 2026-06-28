# 04. Claude Code Setup｜安裝與配置

> 萃取自《Claude Code in Action》中文版 · 第 04 課 · 讲义
> 原文連結(英文原版,需登入):https://anthropic.skilljar.com/claude-code-in-action/301614
> 來源:cholf5/claude-code-in-action(社群中譯)· **簡體原文逐字快取**,要 quote 時撈這裡

---

**准备开始在本地安装 Claude Code！**

完整的安装说明请参考：
 https://code.claude.com/docs/en/quickstart

简要步骤如下：

1. 安装 Claude Code

 macOS（Homebrew）：`brew install --cask claude-code`
2. macOS / Linux / WSL：`curl -fsSL https://claude.ai/install.sh | bash`
3. Windows CMD：
 `curl -fsSL https://claude.ai/install.cmd -o install.cmd && install.cmd && del install.cmd`

              安装完成后，在终端运行 claude。首次运行会提示你进行认证。

如果你使用 AWS Bedrock 或 Google Cloud Vertex，还需要额外配置：

- AWS Bedrock 说明：
 https://code.claude.com/docs/en/amazon-bedrock
- Google Cloud Vertex 说明：
 https://code.claude.com/docs/en/google-vertex-ai
