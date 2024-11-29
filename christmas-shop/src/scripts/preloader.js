export default function preloader() {
  window.addEventListener('load', () => {
    document.body.classList.remove('loading');
  });
}