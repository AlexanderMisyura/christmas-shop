import BaseComponent from '../base.js';
import tag from '../utilTags.js';
import Nav from '../nav/nav.js';

import * as styles from './header.module.scss';

import snowflake from './snowflake.svg';
import svgChunkTemplate from '../svgChunkTemplate.js';

export default class Header extends BaseComponent {
  /**
   * @param {Props} props
   * @param {State} [state]
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

    const logo = tag.a({ href: './', classList: styles.headerLogo }, [
      tag.span({ classList: 'action-small', text: 'THE GIFTS' }),
    ]);
    const logoImg = svgChunkTemplate(snowflake, 'icon-medium');
    logo.element.insertAdjacentHTML('afterbegin', logoImg);

    const linkHandler = props?.callbacks?.linkHandler;

    if (linkHandler) {
      logo.addListener('click', (e) => {
        this.updateState({ isSidebarOpen: false });
        linkHandler(e);
      });
    }

    container.appendChildElements([
      logo,
      new Nav({ ...props, ...{ classList: styles.headerNav } }, state),
    ]);
  }
}
