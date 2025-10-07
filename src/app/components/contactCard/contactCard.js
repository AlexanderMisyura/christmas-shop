/// <reference types="../../../types/types.d.ts" />

import BaseComponent from '../base.js';
import tag from '../utilTags.js';

import * as styles from './contactCard.module.scss';

import svgChunkTemplate from '../svgChunkTemplate.js';

export default class ContactCard extends BaseComponent {
  /** @param {{ href: string, icon: string, heading: string, cta: string,}} item */
  constructor(item) {
    super({ elementTagName: 'li', classList: styles.contactCard });

    const contactImg = svgChunkTemplate(item.icon, 'icon-extra-large');
    const imgContainer = tag.div();
    imgContainer.element.insertAdjacentHTML('afterbegin', contactImg);

    const card = tag.a(
      {
        classList: styles.contactCardLink,
        href: item.href,
        target: '_blanc',
      },
      [
        imgContainer,
        tag.div({
          classList: [styles.contactCardAction, 'action-large'],
          text: item.heading,
        }),
        tag.div({
          classList: [styles.contactCardHeading, 'heading-3'],
          text: item.cta,
        }),
      ]
    );

    this.appendSingleChild(card);
  }
}
