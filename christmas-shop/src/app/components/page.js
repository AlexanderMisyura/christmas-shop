import '../main.scss';

import BaseComponent from './base.js';
import Header from './header/header.js';
import Hero from './hero/hero.js';

export default class Page extends BaseComponent {
  /**
   * @param {State} [state]
   * @param {Props} [props]
   */
  constructor(props, state) {
    super(
      { elementTagName: 'div', classList: 'page' },
      [
        new Header(props, state),
        new BaseComponent(
          { elementTagName: 'main', classList: 'main' },
          [new Hero(props, state)],
          state
        ),
      ],
      state
    );
  }

  mount() {
    document.body.append(this.getElement());
  }
}
