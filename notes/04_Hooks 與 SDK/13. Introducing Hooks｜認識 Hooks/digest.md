# 13. Introducing Hooks｜認識 Hooks

> 萃取自《Claude Code in Action》中文版 · 第 13 課 · 视频 + 讲义
> 原文連結(英文原版,需登入):https://anthropic.skilljar.com/claude-code-in-action/312000
> 來源:cholf5/claude-code-in-action(社群中譯)· **簡體原文逐字快取**,要 quote 時撈這裡

---

Hooks 允许你在 Claude 使用工具前后运行自定义命令。它非常适合做自动化，比如在编辑后自动格式化代码、
 运行测试，或阻止访问特定文件。

## Hooks 如何工作

在常规流程中，Claude 接收你的问题，决定使用工具，然后 Claude Code 执行工具并把结果返回给模型。
 Hooks 会插入到这个流程中，让你在工具执行前或后运行自己的逻辑。

![Hooks 工作流程](https://everpath-course-content.s3-accelerate.amazonaws.com/instructor%2Fa46l9irobhg0f5webscixp0bs%2Fpublic%2F1752618158%2F010_-_Introducing_Hooks_06.1752618158162.png)

Hooks 分为两类：

- **PreToolUse**：在工具执行前触发
- **PostToolUse**：在工具执行后触发

## Hooks 配置位置

Hooks 写在 Claude 的设置文件中，可放在：

- **全局**：`~/.claude/settings.json`（影响所有项目）
- **项目级**：`.claude/settings.json`（团队共享）
- **项目级（不提交）**：`.claude/settings.local.json`（个人配置）

也可以在 Claude Code 内使用 `/hooks` 命令进行设置。

![Hooks 配置入口](https://everpath-course-content.s3-accelerate.amazonaws.com/instructor%2Fa46l9irobhg0f5webscixp0bs%2Fpublic%2F1752618158%2F010_-_Introducing_Hooks_07.1752618158600.png)

配置结构大致如下：

![Hooks 配置结构](https://everpath-course-content.s3-accelerate.amazonaws.com/instructor%2Fa46l9irobhg0f5webscixp0bs%2Fpublic%2F1752618159%2F010_-_Introducing_Hooks_10.1752618159645.png)

## PreToolUse 示例

```
"PreToolUse": [
  {
    "matcher": "Read",
    "hooks": [
      {
        "type": "command",
        "command": "node /home/hooks/read_hook.ts"
      }
    ]
  }
]
```

该配置会在执行 Read 工具前运行指定命令，你可以：

- 允许工具正常执行
- 阻止操作，并向 Claude 返回错误信息

## PostToolUse 示例

```
"PostToolUse": [
  {
    "matcher": "Write|Edit|MultiEdit",
    "hooks": [
      {
        "type": "command",
        "command": "node /home/hooks/edit_hook.ts"
      }
    ]
  }
]
```

PostToolUse 无法阻止工具执行，但可以：

- 在编辑后自动运行格式化或测试
- 把额外反馈返回给 Claude

![PostToolUse 反馈](https://everpath-course-content.s3-accelerate.amazonaws.com/instructor%2Fa46l9irobhg0f5webscixp0bs%2Fpublic%2F1752618160%2F010_-_Introducing_Hooks_15.1752618160073.png)

## 常见应用场景

- **代码格式化**：编辑后自动格式化
- **自动测试**：文件变更后运行测试
- **访问控制**：阻止读写敏感文件
- **代码质量**：跑 linter/类型检查并反馈
- **日志记录**：追踪 Claude 访问的文件
- **规则校验**：强制命名或编码规范

Hooks 能把你的工具和流程整合进 Claude Code。PreToolUse 给你控制权，PostToolUse 让你增强 Claude 的结果。
