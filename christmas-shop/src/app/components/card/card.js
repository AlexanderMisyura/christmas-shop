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
  /** @type {Gift} */
  card;

  /**
   * @param {State} state
   * @param {Props} props
   */
  constructor(props, state) {
    super({ elementTagName: 'div', classList: styles.card }, [], state);

    if (props.customData) {
      this.card = props.customData.gift;

      const cardImg = tag.img({
        classList: styles.cardImg,
        src: relatedData[this.card.category].imgSrc,
        alt: relatedData[this.card.category].imgAlt,
      });

      const cardFooter = tag.footer({ classList: styles.cardFooter }, [
        tag.div({
          classList: [
            'heading-4',
            relatedData[this.card.category].captionClass,
          ],
          text: this.card.category,
        }),
        tag.div({
          classList: [styles.cardHeading, 'heading-3'],
          text: this.card.name,
        }),
      ]);

      this.appendChildElements([cardImg, cardFooter]);

      this.addListener('click', this.handleClick.bind(this));
    }
  }

  /**
   * Returns the card's center coordinates.
   * @returns {CardCenterCoords}
   */
  getCenterCoords() {
    const rect = this.element.getBoundingClientRect();
    return { x: rect.x + rect.width / 2, y: rect.y + rect.height / 2 };
  }

  /**
   * Updates the state with card related data.
   * @returns {void}
   */
  handleClick() {
    this.updateState({
      isModalOpen: true,
      giftModal: this.card,
      cardCenterCoords: this.getCenterCoords(),
    });
  }
}
