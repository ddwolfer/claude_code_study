# 11. MCP Servers｜MCP 伺服器

> 萃取自《Claude Code in Action》中文版 · 第 11 課 · 视频 + 讲义
> 原文連結(英文原版,需登入):https://anthropic.skilljar.com/claude-code-in-action/303239
> 來源:cholf5/claude-code-in-action(社群中譯)· **簡體原文逐字快取**,要 quote 時撈這裡

---

你可以通过 MCP（Model Context Protocol）服务器扩展 Claude Code 的能力。MCP 服务器可以在本地或远程运行，
 为 Claude 提供原本没有的新工具与新能力。

最常用的 MCP 服务器之一是 Playwright，它能让 Claude 控制浏览器，为 Web 开发流程带来巨大提升。

## 安装 Playwright MCP 服务器

在终端运行以下命令（不要在 Claude Code 里运行）：

```
claude mcp add playwright npx @playwright/mcp@latest
```

该命令会：

- 把 MCP 服务器命名为 `playwright`
- 指定本地启动服务器的命令

## 权限管理

默认情况下 Claude 每次使用 MCP 工具都会请求权限。如果你不想频繁确认，可以在设置中预先允许：

```
{
  "permissions": {
    "allow": ["mcp__playwright"],
    "deny": []
  }
}
```

注意 `mcp__playwright` 中有双下划线。这样 Claude 便可直接使用 Playwright 工具。

## 实战示例：提升组件生成质量

Playwright 可以让 Claude 自动化以下流程：

1. 打开浏览器并进入你的应用
2. 生成测试组件
3. 分析视觉样式与代码质量
4. 更新生成提示词
5. 再次测试新提示词

例如：

            “访问 localhost:3000，生成一个基础组件，检查样式，然后更新
            @src/lib/prompts/generation.tsx 里的提示词，让后续组件更好。”

Claude 会用浏览器工具观察真实视觉结果，再改写提示词，让生成的设计更有创意与差异化。

## 收益与效果

实践中，这种流程能显著提升生成质量，例如：

- 从“紫蓝渐变 + 标准 Tailwind 结构”升级为更丰富的配色
- 暖色夕阳渐变（橙 → 粉 → 紫）
- 海洋深度主题（青绿 → 翡翠 → 青蓝）
- 非对称布局与重叠元素
- 更具创造性的留白与结构

核心优势是：Claude 能看到真实视觉输出，而不是只盯着代码。

## 探索更多 MCP 服务器

Playwright 只是其中一个例子。MCP 生态还包括：

- 数据库交互
- API 测试与监控
- 文件系统操作
- 云服务集成
- 开发工具自动化

选择符合你需求的 MCP 服务器，可以让 Claude 从“代码助手”升级为“全流程开发伙伴”。
