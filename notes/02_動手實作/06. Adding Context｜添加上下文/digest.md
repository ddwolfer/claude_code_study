# 06. Adding Context｜添加上下文

> 萃取自《Claude Code in Action》中文版 · 第 06 課 · 视频 + 讲义
> 原文連結(英文原版,需登入):https://anthropic.skilljar.com/claude-code-in-action/303241
> 來源:cholf5/claude-code-in-action(社群中譯)· **簡體原文逐字快取**,要 quote 時撈這裡

---

在用 Claude 处理编程项目时，上下文管理非常关键。你的项目可能有几十甚至上百个文件，但 Claude
 只需要与任务相关的部分。过多无关上下文反而会降低 Claude 的表现，因此学会引导它定位关键文件与文档非常重要。

![上下文管理示意](https://everpath-course-content.s3-accelerate.amazonaws.com/instructor%2Fa46l9irobhg0f5webscixp0bs%2Fpublic%2F1750967940%2F004_-_Adding_Context_02.1750967940092.png)

## /init 命令

当你在新项目里第一次启动 Claude 时，运行 `/init` 命令。它会分析整个代码库并理解：

- 项目目标与架构
- 关键命令与核心文件
- 代码风格与模式

![init 输出](https://everpath-course-content.s3-accelerate.amazonaws.com/instructor%2Fa46l9irobhg0f5webscixp0bs%2Fpublic%2F1750967941%2F004_-_Adding_Context_05.1750967940882.png)

分析完成后，Claude 会生成一份摘要并写入 `CLAUDE.md`。当 Claude 询问是否允许写入时，
 你可以按 Enter 逐次确认，或按 Shift+Tab 让 Claude 在本次会话中自由写文件。

## CLAUDE.md 文件

`CLAUDE.md` 有两个主要作用：

- 引导 Claude 理解你的代码库：重要命令、架构、代码风格
- 允许你给 Claude 添加特定或自定义指令

该文件会自动包含在每一次请求中，相当于项目级的持久系统提示词。

## CLAUDE.md 的位置

Claude 识别以下三处常见位置的 `CLAUDE.md`：

![CLAUDE.md 位置](https://everpath-course-content.s3-accelerate.amazonaws.com/instructor%2Fa46l9irobhg0f5webscixp0bs%2Fpublic%2F1750967941%2F004_-_Adding_Context_09.1750967941793.png)

- **CLAUDE.md**：由 /init 生成，提交到仓库，与团队共享
- **CLAUDE.local.md**：个人专用，不与团队共享
- **~/.claude/CLAUDE.md**：全局文件，适用于本机所有项目

## 添加自定义指令

你可以在 `CLAUDE.md` 中添加指令来调整 Claude 的行为。

使用 `#` 命令进入“记忆模式”，例如：

```
# Use comments sparingly. Only comment complex code.
```

Claude 会自动将这条指令合并进 `CLAUDE.md`。

## 使用 @ 提及文件

当你希望 Claude 查看某个文件时，可以用 `@` 加上路径。这样会自动把该文件内容加入请求。

例如：

```
How does the auth system work? @auth
```

Claude 会列出相关文件供你选择，然后把选中的文件加入对话。

## 在 CLAUDE.md 中引用文件

你也可以在 `CLAUDE.md` 里用 `@` 直接引用文件。

比如数据库 schema 文件：

```
The database schema is defined in the @prisma/schema.prisma file. Reference it anytime you need to understand the structure of data stored in the database.
```

这样一来，每次请求都会自动包含该文件内容，Claude 就不需要反复搜索与读取。
