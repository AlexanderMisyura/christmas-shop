import BaseComponent from '../base.js';
import tag from '../utilTags.js';
import Cards from '../cards/cards.js';

import * as styles from './bestGifts.module.scss';
import * as animatedBg from '../snowfall/snowfall.module.scss';

/**
 * Shuffles an array in a random order.
 * @param {Array} arr
 * @returns {Array}
 */
function shuffle(arr) {
  const shuffled = [...arr];

  for (let i = shuffled.length - 1; i >= 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled;
}

export default class BestGifts extends BaseComponent {
  /**
   * @type {Cards}
   */
  cards;

  /**
   * @param {State} state
   */
  constructor(state) {
    super({ elementTagName: 'section', id: 'best' }, [], state);

    this.cards = this.generateCards();

    const wrapper = tag.div(
      {
        classList: ['wrapper', styles.bestGiftsWrapper, animatedBg.snowfall],
      },
      tag.div(
        {
          classList: [
            'main-container',
            styles.bestGiftsContainer,
            animatedBg.snowfallWrapper,
          ],
        },
        [
          tag.div({ classList: styles.bestGiftsText }, [
            tag.div({ classList: 'caption', text: 'Best Gifts' }),
            tag.h2({ classList: 'heading-2', text: 'especially for you' }),
          ]),
          this.cards,
        ]
      )
    );

    this.appendSingleChild(wrapper);

    this.currentState = {
      currentPage: this.state.stateObj.currentPage,
      gifts: this.state.stateObj.gifts,
    };

    this.subscribe(this.state, this.updateCards.bind(this));
  }

  /**
   * A method to be called by publisher: updates the cards on home page.
   * @param {StateObj} stateObj
   * @returns {void}
   */
  updateCards(stateObj) {
    if (
      stateObj.currentPage === '/' &&
      (this.currentState.currentPage !== stateObj.currentPage ||
        this.currentState.gifts !== stateObj.gifts)
    ) {
      const newCards = this.generateCards();
      this.cards.element.replaceWith(newCards.element);
      this.cards = newCards;
    }

    this.currentState.currentPage = stateObj.currentPage;
    this.currentState.gifts = stateObj.gifts;
  }

  /**
   * Returns Cards component filled with gift cards.
   * @returns {Cards}
   */
  generateCards() {
    return new Cards(
      {
        classList: styles.bestGiftsCards,
        customData: { gifts: shuffle(this.state.stateObj.gifts).slice(0, 4) },
      },
      this.state
    );
  }
}
