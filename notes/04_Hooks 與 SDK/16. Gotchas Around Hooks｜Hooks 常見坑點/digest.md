# 16. Gotchas Around Hooks｜Hooks 常見坑點

> 萃取自《Claude Code in Action》中文版 · 第 16 課 · 讲义
> 原文連結(英文原版,需登入):https://anthropic.skilljar.com/claude-code-in-action/312423
> 來源:cholf5/claude-code-in-action(社群中譯)· **簡體原文逐字快取**,要 quote 時撈這裡

---

你可能注意到，在运行 `npm run dev` 后，`.claude` 目录里会出现两个
 `settings.json` 文件。下面解释原因。

Claude Code 文档对 Hook 安全有一些推荐：

![Hooks 安全建议](https://everpath-course-content.s3-accelerate.amazonaws.com/instructor%2Fa46l9irobhg0f5webscixp0bs%2Fpublic%2F1752683124%2FScreenshot+2025-07-16+at+10.25.07%E2%80%AFAM.1752683124012.png)

其中一条是：脚本尽量使用绝对路径，而不是相对路径。这样可以降低
 [路径拦截](https://attack.mitre.org/techniques/T1574/007/) 或
 [二进制植入](https://owasp.org/www-community/attacks/Binary_planting)
 的风险。

但绝对路径也带来共享困难，因为你机器上的路径与其他人可能完全不同。

为了解决这个问题，项目提供了 `settings.example.json`。其中脚本路径使用
 `$PWD` 占位符。运行 `npm run setup` 时，会执行 scripts 目录中的
 `init-claude.js`：

- 将 `$PWD` 替换为本机项目的绝对路径
- 复制 `settings.example.json`
- 重命名为 `settings.local.json`

这样既能共享配置，又能满足使用绝对路径的安全建议。
