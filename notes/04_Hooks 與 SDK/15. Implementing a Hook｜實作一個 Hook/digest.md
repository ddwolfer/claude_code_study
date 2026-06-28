# 15. Implementing a Hook｜實作一個 Hook

> 萃取自《Claude Code in Action》中文版 · 第 15 課 · 视频 + 讲义
> 原文連結(英文原版,需登入):https://anthropic.skilljar.com/claude-code-in-action/312003
> 來源:cholf5/claude-code-in-action(社群中譯)· **簡體原文逐字快取**,要 quote 時撈這裡

---

我们来构建一个 Hook，防止 Claude 读取敏感文件（例如 .env）。这是一个保护环境变量的典型场景。

## 配置 Hook

在 `.claude/settings.local.json` 中添加 PreToolUse Hook，用于在工具执行前拦截。

配置的关键要素包括：

- **matcher**：匹配触发的工具
- **command**：运行的脚本

示例：

```
"matcher": "Read|Grep"
```

管道符 `|` 表示“或”，因此 Read 或 Grep 都会触发。

```
"command": "node ./hooks/read_hook.js"
```

## 理解工具调用数据

Hook 通过标准输入接收 JSON，其中包含：

- 会话 ID 与 transcript 路径
- Hook 事件名（PreToolUse）
- 工具名（Read、Grep 等）
- 工具输入（文件路径等）

你的脚本读取 JSON 后，决定允许或阻止。

## 实现 Hook 脚本

核心逻辑如下：

```
async function main() {
  const chunks = [];
  for await (const chunk of process.stdin) {
    chunks.push(chunk);
  }

  const toolArgs = JSON.parse(Buffer.concat(chunks).toString());

  // Extract the file path Claude is trying to read
  const readPath =
    toolArgs.tool_input?.file_path || toolArgs.tool_input?.path || "";

  // Check if Claude is trying to read the .env file
  if (readPath.includes('.env')) {
    console.error("You cannot read the .env file");
    process.exit(2);
  }
}
```

当路径包含 .env 时，脚本写错误并以退出码 2 终止，Claude 会理解这是 Hook 的阻止。

## 测试 Hook

保存配置与脚本后，重启 Claude Code，再尝试让 Claude 读取 .env。

Hook 会拦截并返回错误信息，Claude 会解释操作被 Hook 阻止。同理，如果 Claude 用 Grep 搜索 .env，也会被阻止。

## 收益

- **主动防护**：在敏感数据被读取前阻止
- **透明可解释**：Claude 会收到清晰的阻止原因
- **灵活匹配**：可覆盖多个工具与路径
- **可扩展**：适用于任意敏感文件/目录

你可以在此基础上扩展更多规则，实现更精细的访问控制。
