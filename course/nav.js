(() => {
  const items = window.CC_NAV_ITEMS || [];
  const current = window.location.pathname.split('/').pop() || 'index.html';
  const currentIdx = items.findIndex((item) => item.file === current);

  const nav = document.querySelector('.lesson-nav');
  if (!nav) return;

  nav.innerHTML = '';

  if (currentIdx > 0) {
    const prev = items[currentIdx - 1];
    const prevLink = document.createElement('a');
    prevLink.href = prev.file;
    prevLink.textContent = '上一节';
    nav.appendChild(prevLink);
  }

  const indexLink = document.createElement('a');
  indexLink.href = 'index.html';
  indexLink.textContent = '目录';
  nav.appendChild(indexLink);

  if (currentIdx >= 0 && currentIdx < items.length - 1) {
    const next = items[currentIdx + 1];
    const nextLink = document.createElement('a');
    nextLink.href = next.file;
    nextLink.textContent = '下一节';
    nav.appendChild(nextLink);
  }
})();
