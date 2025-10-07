/// <reference types="../../../types/types.d.ts" />

import BaseComponent from '../base.js';
import tag from '../utilTags.js';
import Cards from '../cards/cards.js';

import * as styles from './gifts.module.scss';

const CATEGORIES = ['All', 'For Work', 'For Health', 'For Harmony'];

/** @typedef {import('../../types').Props} Props */
/** @typedef {import('../../types').State} State */
/** @typedef {import('../../types').StateObj} StateObj */

export default class Gifts extends BaseComponent {
  /**
   * @type {Cards}
   */
  cards;

  /** @type {Object<string, HTMLElement>} */
  tabs;

  /**
   * @param {State} state
   */
  constructor(state) {
    super({ elementTagName: 'section', classList: 'gifts' }, [], state);

    this.cards = this.generateCards();
    this.tabs = {};

    const wrapper = tag.div({ classList: ['wrapper', styles.giftsWrapper] });
    this.appendSingleChild(wrapper);

    const container = tag.div(
      { classList: ['main-container', styles.giftsContainer] },
      [
        tag.div(
          { classList: styles.giftsHeader },
          tag.h1({
            classList: ['heading-1', 'inner-block'],
            text: 'achieve health, harmony, and inner strength',
          })
        ),
      ]
    );

    wrapper.appendSingleChild(container);

    const tabs = tag.div({ classList: styles.giftsTabs });

    CATEGORIES.forEach((category) => {
      const { activeCategory } = this.state.stateObj;

      const input = tag.input({
        type: 'radio',
        name: 'activeCategory',
        value: category,
        classList: styles.giftsTabInput,
      });

      const tabBtn = tag.div({
        classList: [
          category === activeCategory ? styles.giftsTabActive : 'hui',
          styles.giftsTab,
          'action-small',
          'btn',
        ],
        text: category.toLowerCase(),
      });

      const tab = tag.label({}, [input, tabBtn]);

      this.tabs[category] = tabBtn.element;

      input.addListener('change', this.handleTab.bind(this));

      tabs.appendSingleChild(tab);
    });

    container.appendChildElements([tabs, this.cards]);

    this.currentState = {
      activeCategory: this.state.stateObj.activeCategory,
      gifts: this.state.stateObj.gifts,
    };

    this.subscribe(this.state, [
      this.updateActiveTabCards.bind(this),
      this.updateActiveTabs.bind(this),
    ]);
  }

  /**
   * A method to be called by publisher: updates active cards on gifts page.
   * @param {StateObj} stateObj
   * @returns {void}
   */
  updateActiveTabs(stateObj) {
    if (this.currentState.activeCategory === stateObj.activeCategory) return;

    this.tabs[this.currentState.activeCategory].classList.remove(
      styles.giftsTabActive
    );
    this.tabs[stateObj.activeCategory].classList.add(styles.giftsTabActive);

    this.currentState.activeCategory = stateObj.activeCategory;
  }

  /**
   * A method to be called by publisher: updates active cards on gifts page.
   * @param {StateObj} stateObj
   * @returns {void}
   */
  updateActiveTabCards(stateObj) {
    if (
      this.currentState.activeCategory !== stateObj.activeCategory ||
      this.currentState.gifts !== stateObj.gifts
    ) {
      const newCards = this.generateCards();
      this.cards.element.replaceWith(newCards.element);
      this.cards = newCards;

      this.currentState.gifts = stateObj.gifts;
    }
  }

  /**
   * Updates the state with new active gifts category.
   * @param {Event} e
   * @returns {void}
   */
  handleTab(e) {
    if (e.currentTarget instanceof HTMLInputElement) {
      const target = e?.currentTarget;
      this.updateState({ activeCategory: target.value });
    }
  }

  /**
   * Returns Cards component filled with gift cards.
   * @returns {Cards}
   */
  generateCards() {
    const category = this.state.stateObj.activeCategory;
    const giftsArray = this.state.stateObj.gifts;

    const giftsFiltered =
      category === 'All'
        ? giftsArray
        : giftsArray.filter((gift) => gift.category === category);

    return new Cards({ customData: { gifts: giftsFiltered } }, this.state);
  }
}
