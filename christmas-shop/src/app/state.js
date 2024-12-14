/// <reference path="./types.js" />

/** @type {StateObj} */
const defaultState = {
  isSidebarOpen: false,
  isModalOpen: false,
  sliderSteps: 3,
  currentPage: '/',
  gifts: [],
  giftModal: null,
  activeCategory: 'All',
  cardCenterCoords: { x: 0, y: 0 },
};

const CARDS_DATA_URL =
  'https://raw.githubusercontent.com/rolling-scopes-school/tasks/refs/heads/master/tasks/christmas-shop/gifts.json';

export default class State {
  /** @type {StateObj} */
  stateObj;

  /**
   * An array of subscribers.
   *  @type {SubscriberCb[]}
   */
  subscribers;

  constructor() {
    this.stateObj = defaultState;
    this.subscribers = [];

    this.getCards(CARDS_DATA_URL);
  }

  /**
   * Adds subscribers.
   * @param {(state: StateObj) => void} updateCallback A callback function of the subscriber class.
   * @returns {void}
   */
  addSubscribers(updateCallback) {
    this.subscribers.push(updateCallback);
  }

  /**
   * Removes subscribers.
   * @param {SubscriberCb} updateCallback A callback function of the subscriber class.
   * @returns {void}
   */
  removeSubscriber(updateCallback) {
    this.subscribers = this.subscribers.filter(
      (subscriber) => subscriber !== updateCallback
    );
  }

  /**
   * A Subscribers' notification method.
   * @returns {void}
   */
  notify() {
    this.subscribers.forEach((updateCallback) => updateCallback(this.stateObj));
  }

  /**
   * Updates current state.
   * @param {PartialStateObj} newState - An object to update current state with.
   * @returns {void}
   */
  updateState(newState) {
    let isStateChanged = false;

    Object.entries(newState).forEach(([key, value]) => {
      if (this.stateObj[key] !== value) {
        isStateChanged = true;
      }
    });

    if (isStateChanged) {
      this.stateObj = { ...this.stateObj, ...newState };
      this.notify();
    }
  }

  /**
   * Fetches cards data and updates the state object with it.
   * @param {string} url
   * @returns {Promise<void>}
   */
  async getCards(url) {
    const result = await fetch(url);
    const cardsArray = await result.json();

    this.updateState({ gifts: cardsArray });
  }
}
