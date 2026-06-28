# 14. Defining Hooks｜定義 Hooks

> 萃取自《Claude Code in Action》中文版 · 第 14 課 · 视频 + 讲义
> 原文連結(英文原版,需登入):https://anthropic.skilljar.com/claude-code-in-action/312002
> 來源:cholf5/claude-code-in-action(社群中譯)· **簡體原文逐字快取**,要 quote 時撈這裡

---

Hooks 让你在工具调用前后拦截并控制 Claude 的行为，从而对开发环境拥有更细粒度的掌控。

## 构建一个 Hook 的步骤

![Hook 构建步骤](https://everpath-course-content.s3-accelerate.amazonaws.com/instructor%2Fa46l9irobhg0f5webscixp0bs%2Fpublic%2F1752618153%2F011_-_Defining_Hooks_05.1752618152864.png)

1. **选择 PreToolUse 或 PostToolUse**：前者可阻止工具执行，后者只能在执行后处理
2. **确定要监控的工具类型**：明确哪些工具触发 Hook
3. **编写接收工具调用的命令**：通过标准输入获取 JSON 数据
4. **必要时向 Claude 反馈**：用退出码控制允许/阻止

## 可用工具

![内置工具列表](https://everpath-course-content.s3-accelerate.amazonaws.com/instructor%2Fa46l9irobhg0f5webscixp0bs%2Fpublic%2F1752618153%2F011_-_Defining_Hooks_07.1752618153492.png)

可用工具会随着 MCP 服务器变化，因此可直接让 Claude 列出当前工具列表以确认。

## 工具调用的数据结构

![工具调用数据结构](https://everpath-course-content.s3-accelerate.amazonaws.com/instructor%2Fa46l9irobhg0f5webscixp0bs%2Fpublic%2F1752618154%2F011_-_Defining_Hooks_11.1752618154320.png)

```
{
  "session_id": "2d6a1e4d-6...",
  "transcript_path": "/Users/sg/...",
  "hook_event_name": "PreToolUse",
  "tool_name": "Read",
  "tool_input": {
    "file_path": "/code/queries/.env"
  }
}
```

Hook 命令读取该 JSON，并决定是否允许当前工具调用。

## 退出码与控制逻辑

![退出码说明](https://everpath-course-content.s3-accelerate.amazonaws.com/instructor%2Fa46l9irobhg0f5webscixp0bs%2Fpublic%2F1752618154%2F011_-_Defining_Hooks_16.1752618154725.png)

- **退出码 0**：允许工具正常执行
- **退出码 2**：阻止工具执行（仅 PreToolUse 有效）

如果你在 PreToolUse 中返回 2，写到标准错误的内容会被 Claude 当作反馈信息。

## 常见示例

最常见的用途是阻止 Claude 读取敏感文件，例如 `.env`。因为 Read 和 Grep 都可能访问文件内容，
 你需要同时监控这两个工具，并检测是否指向敏感路径。

这样既能保护文件系统，又能清晰告诉 Claude 为什么被拦截。
