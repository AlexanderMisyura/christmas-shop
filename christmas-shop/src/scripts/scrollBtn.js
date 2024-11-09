import { checkIsHomePage } from './utils';

export default function scrollBtn() {
  if (checkIsHomePage()) return;

  const btn = document.querySelector('.btn_up');

  btn.addEventListener('click', () => {
    window.scrollTo(0, 0);
  });

  window.addEventListener('scroll', () => {
    if (window.scrollY === 0) {
      btn.classList.add('btn_up_disabled');
    } else if (btn.classList.contains('btn_up_disabled')) {
      btn.classList.remove('btn_up_disabled');
    }
  });
}
