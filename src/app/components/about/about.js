/// <reference types="../../../types/types.d.ts" />

import BaseComponent from '../base.js';
import tag from '../utilTags.js';

import * as styles from './about.module.scss';
import * as animatedBg from '../snowfall/snowfall.module.scss';
import santaImg from './santa.png';

export default class About extends BaseComponent {
  constructor() {
    super({ elementTagName: 'section', id: 'about' });

    const wrapper = tag.div({
      classList: [styles.aboutWrapper, 'wrapper', animatedBg.snowfall],
    });

    this.appendSingleChild(wrapper);

    const container = tag.div(
      {
        classList: [
          styles.aboutContainer,
          'main-container',
          animatedBg.snowfallWrapper,
        ],
      },
      [
        tag.div(
          { classList: styles.aboutContent },
          tag.div({ classList: [styles.aboutText, 'inner-block'] }, [
            tag.div({ classList: 'caption', text: 'About' }),
            tag.h2({
              classList: 'heading-2',
              text: 'unleash your inner superhero!',
            }),
            tag.p({
              classList: 'paragraph',
              text: 'This New Year marks the beginning of your journey to inner harmony and new strengths. We offer unique gifts that will help you improve your life.',
            }),
          ])
        ),
        tag.div(
          { classList: styles.aboutImageContainer },
          tag.img({
            src: santaImg,
            alt: 'Santa and the Snowman',
          })
        ),
      ]
    );

    wrapper.appendSingleChild(container);
  }
}
