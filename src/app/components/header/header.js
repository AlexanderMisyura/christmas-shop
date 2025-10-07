/// <reference types="../../../types/types.d.ts" />

import BaseComponent from '../base.js';
import tag from '../utilTags.js';
import Nav from '../nav/nav.js';

import * as styles from './header.module.scss';

import snowflake from './icons/snowflake.svg';
import svgChunkTemplate from '../svgChunkTemplate.js';

/** @typedef {import('../../types').Props} Props */
/** @typedef {import('../../types').State} State */
/** @typedef {import('../../types').StateObj} StateObj */

export default class Header extends BaseComponent {
  /** @type {BaseComponent} */
  logoLink;

  /**
   * @param {Props} props
   * @param {State} state
   */
  constructor(props, state) {
    super({ elementTagName: 'header' }, [], state);

    const wrapper = tag.div({
      classList: [styles.headerWrapper, 'wrapper'],
    });

    this.appendSingleChild(wrapper);

    const container = tag.div({
      classList: [styles.headerContainer, 'main-container'],
    });
    wrapper.appendSingleChild(container);

    this.logoLink = tag.a({ href: '/', classList: styles.headerLogo }, [
      tag.span({ classList: 'action-small', text: 'THE GIFTS' }),
    ]);
    const logoImg = svgChunkTemplate(snowflake, 'icon-medium');
    this.logoLink.element.insertAdjacentHTML('afterbegin', logoImg);

    const linkHandler = props?.callbacks?.linkHandler;

    if (linkHandler) {
      this.logoLink.addListener('click', (e) => {
        this.updateState({ isSidebarOpen: false });
        linkHandler(e);
      });
    }

    container.appendChildElements([
      this.logoLink,
      new Nav({ ...props, ...{ classList: styles.headerNav } }, state),
    ]);

    if (this.state) {
      this.currentState = {
        currentPage: this.state.stateObj.currentPage,
      };
    }
  }
}
