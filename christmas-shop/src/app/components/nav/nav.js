import BaseComponent from '../base.js';
import tag from '../utilTags.js';

import * as styles from './nav.module.scss';

/** @type {{href: string, name: string}[]} */
const LINKS = [
  { href: './gifts', name: 'gifts' },
  { href: './#about', name: 'about' },
  { href: './#best', name: 'best' },
  { href: './#contacts', name: 'contacts' },
];
export default class Nav extends BaseComponent {
  /** @type {Object.<string, BaseComponent>} */
  linkElements = {};

  /**
   * @param {Props} props
   * @param {State} [state]
   */
  constructor(props, state) {
    super({ elementTagName: 'nav', classList: props.classList }, [], state);

    const ul = tag.ul({ classList: styles.navLinkList });
    this.appendSingleChild(ul);

    const linkHandler = props?.callbacks?.linkHandler;

    LINKS.forEach((link) => {
      const li = tag.li();

      const navLink = tag.a({
        classList: ['btn', 'action-small', styles.navLink],
        text: link.name,
        href: link.href,
      });

      if (linkHandler) {
        navLink.addListener(
          'click',
          /** @type {EventListenerOrEventListenerObject} */ (linkHandler)
        );
      }

      li.appendSingleChild(navLink);
      this.linkElements[link.name] = navLink;
      ul.appendSingleChild(li);
    });

    this.btnBurger = tag.button(
      {
        classList: ['btn_burger', styles.navBurger],
      },
      tag.span({ classList: 'btn_burger__burger' })
    );

    this.btnBurger.addListener('click', () => {
      const newSidebarState = !this.state?.stateObj.isSidebarOpen;
      this.updateState({ isSidebarOpen: newSidebarState });
    });

    this.appendSingleChild(this.btnBurger);

    if (this.state) {
      this.subscribe(this.state, [
        this.updateNavActiveLink.bind(this),
        this.updateBurgerBtnToggle.bind(this),
      ]);
      this.updateNavActiveLink(this.state.stateObj);
    }
  }

  /**
   * A method to be called by publisher.
   * Transforms burger button.
   * @param {StateObj} stateObj
   * @returns {void}
   */
  updateBurgerBtnToggle(stateObj) {
    if (stateObj.isSidebarOpen) {
      this.btnBurger.addClasses('btn_burger_active');
    } else {
      this.btnBurger.removeClasses('btn_burger_active');
    }
  }

  /**
   * A method to be called by publisher.
   * Updates styles of the active link.
   * @param {StateObj} stateObj
   * @returns {void}
   */
  updateNavActiveLink(stateObj) {
    const { currentPage } = stateObj;
    const giftsLink = this.linkElements.gifts;

    if (currentPage === '/gifts') {
      giftsLink.addClasses(styles.navLinkActive);
    } else if (currentPage === '/') {
      giftsLink.removeClasses(styles.navLinkActive);
    }
  }
}
