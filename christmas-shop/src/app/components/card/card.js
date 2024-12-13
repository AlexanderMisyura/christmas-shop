import BaseComponent from '../base.js';
import tag from '../utilTags.js';

import * as styles from './card.module.scss';

import workImg from './img/gift-for-work.png';
import healthImg from './img/gift-for-health.png';
import harmonyImg from './img/gift-for-harmony.png';

const relatedData = {
  'For Work': {
    imgSrc: workImg,
    imgAlt: "New Year's toy - a glass marble with a gift box inside",
    captionClass: 'text-work-category',
  },
  'For Health': {
    imgSrc: healthImg,
    imgAlt: "New Year's toy - a glass marble with a Snowman inside",
    captionClass: 'text-health-category',
  },
  'For Harmony': {
    imgSrc: harmonyImg,
    imgAlt: "New Year's toy - a glass marble with a New Year tree inside",
    captionClass: 'text-harmony-category',
  },
};

export default class Card extends BaseComponent {
  /**
   * @param {Props} props
   */
  constructor(props) {
    super({ elementTagName: 'div', classList: styles.card });

    if (props.customData) {
      /** @type {Gift} */
      const card = props.customData.gift;

      const cardImg = tag.img({
        classList: styles.cardImg,
        src: relatedData[card.category].imgSrc,
        alt: relatedData[card.category].imgAlt,
      });

      const cardFooter = tag.footer({ classList: styles.cardFooter }, [
        tag.div({
          classList: ['heading-4', relatedData[card.category].captionClass],
          text: card.category,
        }),
        tag.div({
          classList: [styles.cardHeading, 'heading-3'],
          text: card.name,
        }),
      ]);

      this.appendChildElements([cardImg, cardFooter]);
    }
  }
}
