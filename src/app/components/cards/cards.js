/// <reference types="../../../types/types.d.ts" />

import BaseComponent from '../base.js';
import Card from '../card/card.js';

import * as styles from './cards.module.scss';

/** @typedef {import('../../types').Props} Props */
/** @typedef {import('../../types').State} State */
/** @typedef {import('../../types').Gift} Gift */

export default class Cards extends BaseComponent {
  /**
   * @param {Props} props
   * @param {State} state
   */
  constructor(props, state) {
    super({ elementTagName: 'div', ...props });

    this.addClasses(styles.cards);

    if (props.customData) {
      /** @type {Gift[]} */
      const giftsArray = props.customData.gifts;

      this.appendChildElements(
        giftsArray.map((gift) => new Card({ customData: { gift } }, state))
      );
    }
  }
}
