import BaseComponent from '../base.js';

import arrowUp from './icons/arrow-up.svg';
import svgChunkTemplate from '../svgChunkTemplate.js';

export default class ScrollTopButton extends BaseComponent {
  constructor() {
    super({
      elementTagName: 'button',
      classList: ['btn_up', 'btn_up_disabled'],
    });

    const arrowImg = svgChunkTemplate(arrowUp, 'icon-medium');
    this.element.insertAdjacentHTML('afterbegin', arrowImg);

    this.addListener('click', () => window.scrollTo(0, 0));

    window.addEventListener('scroll', this.handleScroll.bind(this));
  }

  /**
   * Changes the button's visibility depending on window scroll.
   * @returns {void}
   */
  handleScroll() {
    if (window.scrollY === 0) {
      this.removeClasses('btn_up_shown');
      this.addClasses('btn_up_disabled');
    } else if (window.scrollY >= 300) {
      this.removeClasses('btn_up_disabled');
      this.addClasses('btn_up_shown');
    }
  }
}
