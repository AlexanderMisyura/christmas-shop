import BaseComponent from '../base.js';
import tag from '../utilTags.js';
import Timer from '../timer/timer.js';

import * as styles from './cta.module.scss';
import * as animatedBg from '../snowfall/snowfall.module.scss';

export default class Cta extends BaseComponent {
  /**
   * @param {Props} props
   */
  constructor(props) {
    super({ elementTagName: 'section' });

    const wrapper = tag.div({
      classList: ['wrapper', styles.ctaWrapper, animatedBg.snowfall],
    });
    this.appendSingleChild(wrapper);

    const link = tag.a({
      href: './gifts/',
      classList: ['btn_large', 'action-small'],
      text: 'explore magical gifts',
    });

    const linkHandler = props.callbacks?.linkHandler;

    if (linkHandler) {
      link.addListener('click', (e) => linkHandler(e));
    }

    const container = tag.div(
      {
        classList: [
          'main-container',
          styles.ctaContainer,
          animatedBg.snowfallWrapper,
        ],
      },
      tag.div({ classList: [styles.ctaContent, 'inner-block'] }, [
        tag.h2({
          classList: 'heading-2',
          text: 'ready to start your journey to a better version of yourself?',
        }),
        link,
        tag.div({ classList: styles.ctaTimerBlock }, [
          tag.div({
            classList: 'caption',
            text: 'The New Year is Coming Soon...',
          }),
          new Timer(),
        ]),
      ])
    );

    wrapper.appendSingleChild(container);
  }
}
