# 17. Useful Hooks｜實用的 Hooks

> 萃取自《Claude Code in Action》中文版 · 第 17 課 · 视频 + 讲义
> 原文連結(英文原版,需登入):https://anthropic.skilljar.com/claude-code-in-action/312004
> 來源:cholf5/claude-code-in-action(社群中譯)· **簡體原文逐字快取**,要 quote 時撈這裡

---

Claude Code 的 Hooks 能弥补 AI 协作中的常见问题，尤其在大型项目里效果明显。它们会在 Claude 修改代码时
 自动执行，提供即时反馈并阻止常见错误。

## TypeScript 类型检查 Hook

Claude 修改函数签名时，经常忘记更新所有调用点。例如为 `schema.ts` 中函数添加
 `verbose` 参数后，`main.ts` 的调用还保持旧签名，导致类型错误。

解决办法是使用 PostToolUse Hook，在每次编辑后运行 TypeScript 编译器：

- 运行 `tsc --noEmit` 做类型检查
- 收集错误
- 将错误反馈给 Claude
- 提示 Claude 修复相关文件

对于其他强类型语言，也可以使用类似的类型检查流程；弱类型语言则可改用自动化测试。

## 防止重复查询的 Hook

在有大量数据库查询的项目中，Claude 有时会重复造轮子。例如你要求它“增加一个超过三天未处理订单的 Slack
 提醒”，它可能重新写查询而不是复用 `getPendingOrders()`。

![查询重复问题](https://everpath-course-content.s3-accelerate.amazonaws.com/instructor%2Fa46l9irobhg0f5webscixp0bs%2Fpublic%2F1752618172%2F013_-_Useful_Hooks%21_09.1752618172075.png)

该 Hook 的思路是加入“二次审查”流程：

![查询审查流程](https://everpath-course-content.s3-accelerate.amazonaws.com/instructor%2Fa46l9irobhg0f5webscixp0bs%2Fpublic%2F1752618172%2F013_-_Useful_Hooks%21_14.1752618172611.png)

- 当 Claude 修改 `./queries` 目录下的文件时触发
- 程序化启动另一个 Claude Code 实例
- 让第二个实例检查是否已有相似查询
- 若发现重复，反馈给原 Claude
- 提示删除重复代码并复用现有实现

## 实现注意点

TypeScript Hook 较轻量，速度快；查询重复 Hook 更消耗资源，因为它会启动额外 Claude 实例。

- **收益：**减少重复代码，提升一致性
- **成本：**每次修改都要额外调用，耗时并消耗 API
- **建议：**只监控关键目录，避免过度开销

这些 Hook 使用 Claude 的 TypeScript SDK，通过编程方式让一个 Claude 去审查另一个 Claude 的输出。

## 可扩展思路

- 用编译器或 linter 输出做即时反馈
- 用独立 AI 实例做自动代码审查
- 重点监控高价值目录
- 权衡自动化收益与性能成本

关键是找出你流程中的痛点，并用 Hook 自动解决。
