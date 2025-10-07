import '../main.scss';

import BaseComponent from './base.js';
import Header from './header/header.js';
import Hero from './hero/hero.js';
import Sidebar from './sidebar/sidebar.js';
import About from './about/about.js';
import Slider from './slider/slider.js';
import BestGifts from './bestGifts/bestGifts.js';
import Gifts from './gifts/gifts.js';
import Modal from './modal/modal.js';
import Cta from './cta/cta.js';
import Footer from './footer/footer.js';
import ScrollTopButton from './scrollTopButton/scrollTopButton.js';
import Preloader from './preloader/preloader.js';

/** @typedef {import('../types').Props} Props */
/** @typedef {import('../types').State} State */
/** @typedef {import('../types').StateObj} StateObj */

export default class Page extends BaseComponent {
  // #region components
  /** @type {HTMLElement} */
  main;

  /** @type {BaseComponent} */
  homePage;

  /** @type {BaseComponent} */
  giftsPage;

  /** @type {Header} */
  header;

  /** @type {Sidebar} */
  sidebar;

  /** @type {Hero} */
  hero;

  /** @type {About} */
  about;

  /** @type {Slider} */
  slider;

  /** @type {BestGifts} */
  bestGifts;

  /** @type {Gifts} */
  gifts;

  /** @type {Modal} */
  modal;

  /** @type {Cta} */
  cta;

  /** @type {Footer} */
  footer;

  /** @type {ScrollTopButton} */
  scrollTopButton;

  /** @type {Preloader} */
  preloader;
  // #endregion

  /**
   * @param {Props} props
   * @param {State} state
   */
  constructor(props, state) {
    super({ elementTagName: 'div', classList: 'page' }, [], state);

    this.header = new Header(props, state);
    this.sidebar = new Sidebar(props, state);
    this.modal = new Modal(state);
    this.hero = new Hero(props);
    this.about = new About();
    this.slider = new Slider(state);
    this.gifts = new Gifts(state);
    this.bestGifts = new BestGifts(state);
    this.cta = new Cta(props);
    this.footer = new Footer();
    this.scrollTopButton = new ScrollTopButton();
    this.preloader = new Preloader({ customData: { page: this } }, state);

    this.homePage = new BaseComponent(
      { elementTagName: 'main', classList: 'main' },
      [this.hero, this.about, this.slider, this.bestGifts, this.cta]
    );
    this.giftsPage = new BaseComponent(
      { elementTagName: 'main', classList: 'main' },
      [this.gifts, this.scrollTopButton]
    );

    this.main =
      this.state.stateObj.currentPage === '/'
        ? this.homePage.element
        : this.giftsPage.element;

    this.appendChildElements([
      this.preloader,
      this.header,
      this.sidebar,
      this.modal,
      this.state.stateObj.currentPage === '/' ? this.homePage : this.giftsPage,
      this.footer,
    ]);

    if (this.state) {
      this.currentState = { currentPage: this.state.stateObj.currentPage };
      this.subscribe(this.state, this.updatePage.bind(this));
    }
  }

  /**
   * A method to be called by publisher: updates the content of the page.
   * @param {StateObj} stateObj
   * @returns {void}
   */
  updatePage(stateObj) {
    if (this.currentState.currentPage === stateObj.currentPage) return;

    switch (stateObj.currentPage) {
      case '/':
        this.replaceCurrentPage(this.homePage.element);
        break;

      case '/gifts':
        this.replaceCurrentPage(this.giftsPage.element);
        break;

      default:
        break;
    }
    window.scrollTo(0, 0);

    this.currentState.currentPage = stateObj.currentPage;
  }

  /**
   * Switches main content of the page.
   * @param {HTMLElement} newPageElement
   * @returns {void}
   */
  replaceCurrentPage(newPageElement) {
    this.main.replaceWith(newPageElement);
    this.main = newPageElement;
  }

  /**
   * Mounts page content to the document and makes initial setup.
   * @returns {void}
   */
  mount() {
    document.body.append(this.getElement());
  }
}
