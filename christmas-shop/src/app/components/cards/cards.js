import BaseComponent from '../base.js';
import Card from '../card/card.js';

import * as styles from './cards.module.scss';

export default class Cards extends BaseComponent {
  /**
   * @param {Props} props
   */
  constructor(props) {
    super({ elementTagName: 'div', ...props });

    this.addClasses(styles.cards);

    if (props.customData) {
      /** @type {Gift[]} */
      const giftsArray = props.customData.gifts;

      this.appendChildElements(
        giftsArray.map((gift) => new Card({ customData: { gift } }))
      );
    }
  }
}
