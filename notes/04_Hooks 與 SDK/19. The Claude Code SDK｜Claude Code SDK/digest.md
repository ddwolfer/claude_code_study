# 19. The Claude Code SDK｜Claude Code SDK

> 萃取自《Claude Code in Action》中文版 · 第 19 課 · 视频 + 讲义
> 原文連結(英文原版,需登入):https://anthropic.skilljar.com/claude-code-in-action/312001
> 來源:cholf5/claude-code-in-action(社群中譯)· **簡體原文逐字快取**,要 quote 時撈這裡

---

Claude Code SDK 让你可以在应用或脚本中以编程方式调用 Claude Code。它提供 TypeScript、Python 以及 CLI
 方式，功能与终端中的 Claude Code 一致。

![Claude Code SDK](https://everpath-course-content.s3-accelerate.amazonaws.com/instructor%2Fa46l9irobhg0f5webscixp0bs%2Fpublic%2F1752618201%2F014_-_The_Claude_Code_SDK_00.1752618201045.png)

SDK 运行的就是你熟悉的 Claude Code，同样具备完整工具集，适用于自动化与系统集成。

## 关键特性

- 支持编程方式调用 Claude Code
- 功能与终端版本一致
- 继承同目录下 Claude Code 的设置
- 默认只读权限
- 适合嵌入更大的自动化流程

## 基础用法

以下是一个 TypeScript 示例，用于查找重复查询：

```
import { query } from "@anthropic-ai/claude-code";

const prompt = "Look for duplicate queries in the ./src/queries dir";

for await (const message of query({
  prompt,
})) {
  console.log(JSON.stringify(message, null, 2));
}
```

运行后你会看到 Claude Code 与模型之间的完整消息流，最终消息即 Claude 的完整响应。

## 权限与工具

SDK 默认是只读模式，只能读取与检索文件，无法写入或编辑。如果需要写权限，可以在调用时传入
 `allowedTools`：

```
for await (const message of query({
  prompt,
  options: {
    allowedTools: ["Edit"]
  }
})) {
  console.log(JSON.stringify(message, null, 2));
}
```

也可以在项目的 `.claude` 设置文件中进行全局授权。

## 实用场景

- 在 Git hooks 中自动评审改动
- 在构建脚本中分析和优化代码
- 辅助维护任务的工具命令
- 自动生成文档
- CI/CD 中的代码质量检查

SDK 让你把 AI 能力融入任意开发环节，是自动化与集成场景的强大基础设施。
