import '../main.scss';

import BaseComponent from './base.js';

export default class Page extends BaseComponent {
  /**
   * @param {State} [state]
   * @param {Props} [props]
   */
  constructor(props, state) {
    super({ elementTagName: 'div', classList: 'page' }, [], state);
  }

  mount() {
    document.body.append(this.getElement());
  }
}
