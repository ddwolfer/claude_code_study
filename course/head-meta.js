(() => {
  const title = document.title || 'Claude Code 实战课程';
  const description = 'Anthropic 官方课程 Claude Code in Action 的中文翻译';
  const siteName = 'Claude Code 实战课程';

  const metas = [
    ['name', 'description', description],
    ['property', 'og:title', title],
    ['property', 'og:description', description],
    ['property', 'og:type', 'article'],
    ['property', 'og:site_name', siteName],
    ['name', 'twitter:card', 'summary'],
    ['name', 'twitter:title', title],
    ['name', 'twitter:description', description],
  ];

  metas.forEach(([attr, name, content]) => {
    let el = document.querySelector(`meta[${attr}="${name}"]`);
    if (!el) {
      el = document.createElement('meta');
      el.setAttribute(attr, name);
      document.head.appendChild(el);
    }
    el.setAttribute('content', content);
  });
})();
