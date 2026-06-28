# 18. Another Useful Hook｜另一個實用 Hook

> 萃取自《Claude Code in Action》中文版 · 第 18 課 · 讲义
> 原文連結(英文原版,需登入):https://anthropic.skilljar.com/claude-code-in-action/312427
> 來源:cholf5/claude-code-in-action(社群中譯)· **簡體原文逐字快取**,要 quote 時撈這裡

---

除 PreToolUse 与 PostToolUse 外，还有更多 Hook 类型：

- `Notification`：Claude 请求工具权限或 60 秒空闲时触发
- `Stop`：Claude 回复结束时触发
- `SubagentStop`：子代理任务结束时触发
- `PreCompact`：compact 操作前触发
- `UserPromptSubmit`：用户提交提示词时触发
- `SessionStart`：会话开始或恢复时触发
- `SessionEnd`：会话结束时触发

**令人困惑的地方在于：**

1. 不同 Hook 的标准输入结构完全不同
2. PreToolUse/PostToolUse 的输入还会随工具类型变化

例如，下面是一个 PostToolUse（监听 TodoWrite）的输入：

```
{
  "session_id": "9ecf22fa-edf8-4332-ae85-b6d5456eda64",
  "transcript_path": "<path_to_transcript>",
  "hook_event_name": "PostToolUse",
  "tool_name": "TodoWrite",
  "tool_input": {
    "todos": [{ "content": "write a readme", "status": "pending", "priority": "medium", "id": "1" }]
  },
  "tool_response": {
    "oldTodos": [],
    "newTodos": [{ "content": "write a readme", "status": "pending", "priority": "medium", "id": "1" }]
  }
}
```

而 Stop Hook 的输入是：

```
{
  "session_id": "af9f50b6-f042-4773-b3e2-c3a4814765ce",
  "transcript_path": "<path_to_transcript>",
  "hook_event_name": "Stop",
  "stop_hook_active": false
}
```

可以看到，不同 Hook 的输入差异非常大，这使得编写 Hook 变得困难——你不一定知道该解析哪些字段。

建议做一个辅助 Hook 来记录输入：

```
"PostToolUse": [ // Or "PreToolUse" or "Stop", etc
  {
    "matcher": "*",
    "hooks": [
      {
        "type": "command",
        "command": "jq . > post-log.json"
      }
    ]
  },
]
```

该命令会把 Hook 输入写入 `post-log.json`，方便你观察真实结构，从而更容易编写稳定的 Hook。
