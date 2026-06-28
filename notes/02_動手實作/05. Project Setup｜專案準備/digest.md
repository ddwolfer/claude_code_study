# 05. Project Setup｜專案準備

> 萃取自《Claude Code in Action》中文版 · 第 05 課 · 讲义
> 原文連結(英文原版,需登入):https://anthropic.skilljar.com/claude-code-in-action/301615
> 來源:cholf5/claude-code-in-action(社群中譯)· **簡體原文逐字快取**,要 quote 時撈這裡

---

有一个可以操作的项目，会让你在 Claude Code 中练习时更有意思。

我准备了一个小项目供你探索，它就是前面视频里演示的 UI 生成应用。注意：你不一定需要运行这个项目，如果你愿意，也可以用自己的代码库跟随课程。

## 准备步骤

该项目需要一些基础设置：

1. 确保本地安装了 Node.js。安装说明：
 [https://nodejs.org/en/download](https://nodejs.org/en/download)
2. 下载本节附带的 `uigen.zip` 并解压
3. 在项目目录运行 `npm run setup`，安装依赖并初始化本地 SQLite 数据库
4. **可选：**该项目使用 Anthropic API 调用 Claude 生成 UI 组件。
 如果你想完整体验应用，需要提供 API Key（不提供也能生成静态假代码）。

 在
 https://console.anthropic.com/
 获取 API Key
5. 将 API Key 写入 `.env` 文件

            运行 npm run dev 启动项目
