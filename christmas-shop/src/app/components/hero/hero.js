import BaseComponent from '../base.js';
import tag from '../utilTags.js';

import * as styles from './hero.module.scss';
import * as animatedBg from '../snowfall/snowfall.module.scss';

export default class Hero extends BaseComponent {
  /**
   * @param {Props} [props]
   * @param {State} [state]
   */
  constructor(props, state) {
    super({ elementTagName: 'section' }, [], state);

    const wrapper = tag.div({
      classList: [styles.heroWrapper, 'wrapper', animatedBg.snowfall],
    });

    this.appendSingleChild(wrapper);

    const link = tag.a({
      href: './gifts',
      classList: ['btn_large', 'action-small'],
      text: 'explore magical gifts',
    });

    const linkHandler = props?.callbacks?.linkHandler;

    if (linkHandler) {
      link.addListener('click', (e) => linkHandler(e));
    }

    const content = tag.div(
      {
        classList: [
          styles.heroContent,
          'inner-block',
          animatedBg.snowfallWrapper,
        ],
      },
      [
        tag.div({ classList: 'caption', text: 'Merry Christmas' }),
        tag.h1({
          classList: 'heading-1',
          text: 'gift yourself the magic of new possibilities',
        }),
        link,
        tag.span({ classList: 'caption', text: 'and Happy New Year' }),
      ]
    );
    wrapper.appendSingleChild(content);
  }
}
