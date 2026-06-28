# 10. Custom Commands｜自訂命令

> 萃取自《Claude Code in Action》中文版 · 第 10 課 · 视频 + 讲义
> 原文連結(英文原版,需登入):https://anthropic.skilljar.com/claude-code-in-action/303234
> 來源:cholf5/claude-code-in-action(社群中譯)· **簡體原文逐字快取**,要 quote 時撈這裡

---

Claude Code 内置了一批以斜杠开头的命令，你也可以创建自己的命令，把常见流程自动化。

## 创建自定义命令

在项目中准备以下目录结构：

1. 找到项目中的 `.claude` 目录
2. 在其中创建 `commands` 目录
3. 创建一个以命令名命名的 Markdown 文件（如 `audit.md`）

文件名就是命令名，因此 `audit.md` 会生成 `/audit` 命令。

## 示例：审计依赖的命令

一个实用的命令是检查依赖安全问题：

1. 运行 `npm audit` 找出漏洞
2. 运行 `npm audit fix` 自动修复
3. 运行测试验证修复不破坏功能

创建命令文件后，需要重启 Claude Code 才能识别新命令。

## 带参数的命令

自定义命令可以使用 `$ARGUMENTS` 占位符接收参数，从而更灵活。

例如 `write_tests.md`：

```
Write comprehensive tests for: $ARGUMENTS

Testing conventions:
* Use Vitests with React Testing Library
* Place test files in a __tests__ directory in the same folder as the source file
* Name test files as [filename].test.ts(x)
* Use @/ prefix for imports

Coverage:
* Test happy paths
* Test edge cases
* Test error states
```

调用方式：

`/write_tests the use-auth.ts file in the hooks directory`

参数可以是任意文字说明，不一定是文件路径。

## 关键收益

- **自动化**：把重复流程变成一个命令
- **一致性**：确保每次执行遵循相同步骤
- **上下文**：为 Claude 提供固定的项目约定
- **灵活性**：通过参数适配不同场景

自定义命令非常适合项目内的固定流程，例如测试、部署、代码生成等。
