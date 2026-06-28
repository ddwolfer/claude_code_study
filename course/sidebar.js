(() => {
  const items = window.CC_NAV_ITEMS || [];
  const sidebar = document.getElementById('sidebar');
  if (!sidebar || !items.length) return;

  const title = document.createElement('div');
  title.className = 'sidebar-title';
  title.textContent = '课程导航';

  const nav = document.createElement('nav');
  nav.className = 'sidebar-nav';

  const current = window.location.pathname.split('/').pop() || 'index.html';
  items.forEach((item) => {
    const link = document.createElement('a');
    link.href = item.file;
    link.textContent = item.title;
    if (item.file === current) {
      link.classList.add('active');
    }
    nav.appendChild(link);
  });

  sidebar.appendChild(title);
  sidebar.appendChild(nav);
})();
