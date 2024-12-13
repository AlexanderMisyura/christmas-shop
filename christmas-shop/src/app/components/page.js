import '../main.scss';

import BaseComponent from './base.js';
import Header from './header/header.js';
import Hero from './hero/hero.js';
import Sidebar from './sidebar/sidebar.js';
import About from './about/about.js';
import Slider from './slider/slider.js';
import BestGifts from './bestGifts/bestGifts.js';
import Gifts from './gifts/gifts.js';

const TABLET_WIDTH = 768;
const DESKTOP_BREAKPOINT = `(width > ${TABLET_WIDTH}px)`;
const SLIDER_STEPS_WIDE_SCREEN = 3;
const TABLET_BREAKPOINT = `(width <= ${TABLET_WIDTH}px)`;
const SLIDER_STEPS_NARROW_SCREEN = 6;

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
  // #endregion

  /**
   * @param {Props} props
   * @param {State} state
   */
  constructor(props, state) {
    super({ elementTagName: 'div', classList: 'page' }, [], state);

    this.header = new Header(props, state);
    this.sidebar = new Sidebar(props, state);
    this.hero = new Hero(props);
    this.about = new About();
    this.slider = new Slider(state);
    this.gifts = new Gifts(state);
    this.bestGifts = new BestGifts(state);

    this.homePage = new BaseComponent(
      { elementTagName: 'main', classList: 'main' },
      [this.hero, this.about, this.slider, this.bestGifts]
    );
    this.giftsPage = new BaseComponent(
      { elementTagName: 'main', classList: 'main' },
      [this.gifts]
    );

    this.main = this.homePage.element;

    this.appendChildElements([this.header, this.sidebar, this.homePage]);

    this.listen();

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

    const initialSliderSteps =
      window.innerWidth > TABLET_WIDTH
        ? SLIDER_STEPS_WIDE_SCREEN
        : SLIDER_STEPS_NARROW_SCREEN;
    this.updateState({ sliderSteps: initialSliderSteps });
  }

  /**
   * Adds event listeners.
   * @returns {void}
   */
  listen() {
    const desktopMediaQuery = window.matchMedia(DESKTOP_BREAKPOINT);
    desktopMediaQuery.addEventListener('change', (e) => {
      if (e.matches) {
        this.updateState({
          isSidebarOpen: false,
          sliderSteps: SLIDER_STEPS_WIDE_SCREEN,
        });
      }
    });

    const tabletMediaQuery = window.matchMedia(TABLET_BREAKPOINT);
    tabletMediaQuery.addEventListener('change', (e) => {
      if (e.matches) {
        this.updateState({ sliderSteps: SLIDER_STEPS_NARROW_SCREEN });
      }
    });
  }
}
