export default function processSidebar() {
  const TABLET_BREAKPOINT = '(min-width: 769px)';

  const burger = document.querySelector('.btn_burger');
  const sidebar = document.querySelector('.sidebar');
  const linkList = sidebar.querySelector('.sidebar__link-list');

  function toggleSidebar() {
    window.scrollTo(0, 0);
    burger.classList.toggle('btn_burger_active');

    const widthBeforeToggle = document.documentElement.clientWidth;
    document.body.classList.toggle('scroll-disabled');
    const widthAfterToggle = document.documentElement.clientWidth;
    const scrollbarWidth = widthAfterToggle - widthBeforeToggle;
    document.body.style.paddingRight = `${scrollbarWidth > 0 ? scrollbarWidth : 0}px`;

    sidebar.classList.toggle('sidebar_active');
  }

  burger.addEventListener('click', toggleSidebar);

  const mediaQuery = window.matchMedia(TABLET_BREAKPOINT);

  function closeSidebar() {
    burger.classList.remove('btn_burger_active');

    if (document.body.classList.contains('scroll-disabled')) {
      document.body.style = '';
      document.body.classList.remove('scroll-disabled');
    }

    sidebar.classList.remove('sidebar_active');
  }

  mediaQuery.addEventListener('change', (e) => {
    if (e.matches) {
      closeSidebar();
    }
  });

  function followLink(e) {
    e.preventDefault();
    const link = e.target.closest('.sidebar__link');

    if (!link) return;

    if (link.classList.contains('sidebar__link_active')) {
      closeSidebar();
    } else {
      closeSidebar();
      setTimeout(() => {
        location.href = link.href;
      }, 200);
    }
  }

  linkList.addEventListener('click', followLink);
}
