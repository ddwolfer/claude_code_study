#!/usr/bin/env node
/**
 * extract-course.mjs — 把 cholf5《Claude Code in Action》中文版的 21 課靜態 HTML
 * 萃取成本專案的雙樹結構:
 *
 *   1. 課程素材樹(座艙 listLessons 掃描的對象,= study-coach 的「現代系統設計_課程講義」):
 *        Claude Code 實戰_課程講義/<NN_模組>/<NN. English｜中文>/source.html
 *   2. 筆記樹(逐字原文快取,= digest.md;web-notes.md 之後由教練重寫):
 *        notes/<NN_模組>/<NN. English｜中文>/digest.md
 *
 * digest.md 保留「簡體原文」當忠實快取(ground truth);圖片以原始公開 S3 URL 熱連結
 * (座艙渲染 markdown 時直接從 CDN 載入,repo 保持精簡)。本腳本零外部相依、跑一次即可。
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const SRC = join(ROOT, 'course')                       // 扁平 cholf5 clone
const MAT = join(ROOT, 'Claude Code 實戰_課程講義')      // 課程素材樹(座艙掃描)
const NOTES = join(ROOT, 'notes')

// NN → { mod: 模組資料夾, title: 課程資料夾(NN. English｜中文) }
const M1 = '01_什麼是 Claude Code', M2 = '02_動手實作', M3 = '03_控制上下文',
      M4 = '04_Hooks 與 SDK', M5 = '05_收尾'
const LESSONS = {
  '01': { mod: M1, file: '01-introduction.html',                  title: '01. Introduction｜引言' },
  '02': { mod: M1, file: '02-what-is-a-coding-assistant.html',    title: '02. What is a Coding Assistant｜什麼是編碼助手' },
  '03': { mod: M1, file: '03-claude-code-in-action.html',         title: '03. Claude Code in Action｜Claude Code 實戰' },
  '04': { mod: M2, file: '04-claude-code-setup.html',             title: '04. Claude Code Setup｜安裝與配置' },
  '05': { mod: M2, file: '05-project-setup.html',                 title: '05. Project Setup｜專案準備' },
  '06': { mod: M2, file: '06-adding-context.html',                title: '06. Adding Context｜添加上下文' },
  '07': { mod: M2, file: '07-making-changes.html',                title: '07. Making Changes｜進行修改' },
  '08': { mod: M2, file: '08-course-satisfaction-survey.html',    title: '08. Course Satisfaction Survey｜課程滿意度調查' },
  '09': { mod: M3, file: '09-controlling-context.html',           title: '09. Controlling Context｜控制上下文' },
  '10': { mod: M3, file: '10-custom-commands.html',               title: '10. Custom Commands｜自訂命令' },
  '11': { mod: M3, file: '11-mcp-servers-with-claude-code.html',  title: '11. MCP Servers｜MCP 伺服器' },
  '12': { mod: M3, file: '12-github-integration.html',            title: '12. GitHub Integration｜GitHub 整合' },
  '13': { mod: M4, file: '13-introducing-hooks.html',             title: '13. Introducing Hooks｜認識 Hooks' },
  '14': { mod: M4, file: '14-defining-hooks.html',                title: '14. Defining Hooks｜定義 Hooks' },
  '15': { mod: M4, file: '15-implementing-a-hook.html',           title: '15. Implementing a Hook｜實作一個 Hook' },
  '16': { mod: M4, file: '16-gotchas-around-hooks.html',          title: '16. Gotchas Around Hooks｜Hooks 常見坑點' },
  '17': { mod: M4, file: '17-useful-hooks.html',                  title: '17. Useful Hooks｜實用的 Hooks' },
  '18': { mod: M4, file: '18-another-useful-hook.html',           title: '18. Another Useful Hook｜另一個實用 Hook' },
  '19': { mod: M4, file: '19-the-claude-code-sdk.html',           title: '19. The Claude Code SDK｜Claude Code SDK' },
  '20': { mod: M5, file: '20-quiz-on-claude-code.html',           title: '20. Quiz on Claude Code｜Claude Code 測驗' },
  '21': { mod: M5, file: '21-summary-and-next-steps.html',        title: '21. Summary and Next Steps｜總結與下一步' },
}

const decode = (s) => s
  .replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"')
  .replace(/&#39;/g, "'").replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&')

function inline(s) {
  return decode(s
    .replace(/<strong[^>]*>([\s\S]*?)<\/strong>/gi, '**$1**')
    .replace(/<b[^>]*>([\s\S]*?)<\/b>/gi, '**$1**')
    .replace(/<em[^>]*>([\s\S]*?)<\/em>/gi, '*$1*')
    .replace(/<code[^>]*>([\s\S]*?)<\/code>/gi, (m, c) => '`' + decode(c) + '`')
    .replace(/<a\b[^>]*href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/gi, '[$2]($1)')
    .replace(/<br\s*\/?>/gi, ' ')
    .replace(/<[^>]+>/g, '')
    .replace(/[ \t]+/g, ' ')
  ).trim()
}

function htmlToMarkdown(html) {
  const code = []
  html = html.replace(/<pre>\s*<code[^>]*>([\s\S]*?)<\/code>\s*<\/pre>/gi, (m, c) => {
    code.push(decode(c).replace(/^\n+|\n+$/g, '')); return `\n@@CODE${code.length - 1}@@\n`
  })
  html = html.replace(/<img\b[^>]*?\/?>/gi, (tag) => {
    const src = (tag.match(/src="([^"]*)"/i) || [])[1] || ''
    const alt = (tag.match(/alt="([^"]*)"/i) || [])[1] || ''
    return src ? `\n![${alt}](${src})\n` : ''
  })
  html = html.replace(/<h2[^>]*>([\s\S]*?)<\/h2>/gi, (m, t) => `\n## ${inline(t)}\n`)
  html = html.replace(/<h3[^>]*>([\s\S]*?)<\/h3>/gi, (m, t) => `\n### ${inline(t)}\n`)
  html = html.replace(/<ul[^>]*>([\s\S]*?)<\/ul>/gi, (m, inner) =>
    '\n' + [...inner.matchAll(/<li[^>]*>([\s\S]*?)<\/li>/gi)].map(x => `- ${inline(x[1])}`).join('\n') + '\n')
  html = html.replace(/<ol[^>]*>([\s\S]*?)<\/ol>/gi, (m, inner) => {
    let i = 0
    return '\n' + [...inner.matchAll(/<li[^>]*>([\s\S]*?)<\/li>/gi)].map(x => `${++i}. ${inline(x[1])}`).join('\n') + '\n'
  })
  html = html.replace(/<p[^>]*>([\s\S]*?)<\/p>/gi, (m, t) => `\n${inline(t)}\n`)
  html = html.replace(/<[^>]+>/g, '')
  html = html.replace(/@@CODE(\d+)@@/g, (m, i) => '```\n' + code[+i] + '\n```')
  return decode(html).replace(/[ \t]+\n/g, '\n').replace(/\n{3,}/g, '\n\n').trim()
}

let imgCount = 0, ok = 0
for (const [nn, L] of Object.entries(LESSONS)) {
  const raw = readFileSync(join(SRC, L.file), 'utf8')
  const h1 = (raw.match(/<h1>([\s\S]*?)<\/h1>/i) || [])[1]?.trim() || L.title
  const origLink = (raw.match(/原文链接[\s\S]*?<a[^>]*href="([^"]*)"/i) || [])[1] || ''
  const tag = (raw.match(/<span class="tag">([\s\S]*?)<\/span>/i) || [])[1]?.trim() || ''
  const bodyM = raw.match(/<div class="content-body">([\s\S]*?)<\/div>\s*<\/div>\s*<\/main>/i)
  if (!bodyM) { console.error(`⚠️  ${nn}: content-body 抓不到`); continue }
  const md = htmlToMarkdown(bodyM[1])
  imgCount += (md.match(/!\[/g) || []).length

  const matDir = join(MAT, L.mod, L.title)
  const notesDir = join(NOTES, L.mod, L.title)
  mkdirSync(matDir, { recursive: true })
  mkdirSync(notesDir, { recursive: true })
  writeFileSync(join(matDir, 'source.html'), raw)

  const header =
    `# ${L.title}\n\n` +
    `> 萃取自《Claude Code in Action》中文版 · 第 ${nn} 課${tag ? ` · ${tag}` : ''}\n` +
    (origLink ? `> 原文連結(英文原版,需登入):${origLink}\n` : '') +
    `> 來源:cholf5/claude-code-in-action(社群中譯)· **簡體原文逐字快取**,要 quote 時撈這裡\n\n` +
    `---\n\n`
  writeFileSync(join(notesDir, 'digest.md'), header + md + '\n')
  ok++
  console.error(`✓ ${nn} ${L.title}  (${md.length} 字元, ${(md.match(/!\[/g) || []).length} 圖)`)
}
console.error(`\n完成:${ok}/21 課 → digest.md + source.html;共 ${imgCount} 張圖(熱連結 S3）`)
