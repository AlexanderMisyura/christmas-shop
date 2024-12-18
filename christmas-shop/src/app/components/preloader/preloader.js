import BaseComponent from '../base.js';
import tag from '../utilTags.js';
import svgChunkTemplate from '../svgChunkTemplate.js';

import * as styles from './preloader.module.scss';

import snowflakeIcon from './icons/snowflake.svg';

export default class Preloader extends BaseComponent {
  /** @type {BaseComponent} */
  page;

  /**
   * @param {Props} props
   * @param {State} state
   */
  constructor(props, state) {
    super({ elementTagName: 'div', classList: styles.preloader }, [], state);

    const container = tag.div({ classList: styles.preloaderImage });

    const spinnerImg = svgChunkTemplate(snowflakeIcon, styles.preloaderIcon);
    container.element.insertAdjacentHTML('beforeend', spinnerImg);

    this.appendSingleChild(container);

    this.page = props.customData?.page;
    this.page.addClasses(styles.loading);

    this.currentState = { isLoading: true };
    this.subscribe(this.state, this.updatePreloader.bind(this));
  }

  /**
   * Description
   * @param {StateObj} stateObj
   * @returns {void}
   */
  updatePreloader(stateObj) {
    if (this.currentState.isLoading === stateObj.isLoading) return;

    if (stateObj.isLoading) {
      this.page.addClasses(styles.loading);
    } else {
      this.page.removeClasses(styles.loading);
    }

    this.currentState.isLoading = stateObj.isLoading;
  }
}
