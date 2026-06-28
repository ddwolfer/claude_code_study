# 12. GitHub Integration｜GitHub 整合

> 萃取自《Claude Code in Action》中文版 · 第 12 課 · 视频 + 讲义
> 原文連結(英文原版,需登入):https://anthropic.skilljar.com/claude-code-in-action/303240
> 來源:cholf5/claude-code-in-action(社群中譯)· **簡體原文逐字快取**,要 quote 時撈這裡

---

Claude Code 提供官方 GitHub 集成，让 Claude 在 GitHub Actions 中运行。主要有两个流程：在 Issue/PR 中
 @Claude，以及自动 PR Review。

## 安装与配置

在 Claude 中运行 `/install-github-app`，它会引导你完成：

- 安装 Claude Code GitHub App
- 添加 API Key
- 自动生成包含工作流文件的 PR

合并该 PR 后，`.github/workflows` 中会出现两个 Actions。

## 默认的 GitHub Actions

### Mention Action

在 Issue 或 PR 中使用 `@claude`，Claude 将：

- 分析任务并给出计划
- 以完整权限执行任务
- 在 Issue/PR 中回复结果

### Pull Request Action

每次创建 PR 时，Claude 会自动：

- 审查改动
- 分析影响范围
- 发布详细评审报告

## 自定义工作流

合并初始 PR 后，你可以按项目需要调整工作流。

### 添加项目准备步骤

```
- name: Project Setup
  run: |
    npm run setup
    npm run dev:daemon
```

### 添加自定义指令

```
custom_instructions: |
  The project is already set up with all dependencies installed.
  The server is already running at localhost:3000. Logs from it
  are being written to logs.txt. If needed, you can query the
  db with the 'sqlite3' cli. If needed, use the mcp__playwright
  set of tools to launch a browser and interact with the app.
```

### MCP 服务器配置

```
mcp_config: |
  {
    "mcpServers": {
      "playwright": {
        "command": "npx",
        "args": [
          "@playwright/mcp@latest",
          "--allowed-origins",
          "localhost:3000;cdn.tailwindcss.com;esm.sh"
        ]
      }
    }
  }
```

## 工具权限

在 GitHub Actions 中必须明确列出允许的工具（尤其是 MCP 工具）：

```
allowed_tools: "Bash(npm:*),Bash(sqlite3:*),mcp__playwright__browser_snapshot,mcp__playwright__browser_click,..."
```

不同于本地环境，Actions 中没有快捷许可，必须逐项列出。

## 最佳实践

- 从默认工作流开始，逐步定制
- 用自定义指令补充项目上下文
- 使用 MCP 时务必写清工具权限
- 先用简单任务验证工作流，再升级复杂任务

GitHub 集成让 Claude 从“开发助手”升级为团队中的自动化成员，可直接在 GitHub 流程里完成任务与评审。
