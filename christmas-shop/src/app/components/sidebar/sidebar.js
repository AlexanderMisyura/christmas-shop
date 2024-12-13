import BaseComponent from '../base.js';
import tag from '../utilTags.js';

import * as styles from './sidebar.module.scss';

/** @type {{href: string, name: string}[]} */
const LINKS = [
  { href: './gifts', name: 'gifts' },
  { href: './#about', name: 'about' },
  { href: './#best', name: 'best' },
  { href: './#contacts', name: 'contacts' },
];

export default class Sidebar extends BaseComponent {
  /** @type {Object.<string, BaseComponent>} */
  linkElements = {};

  /**
   * @param {Props} props
   * @param {State} state
   */
  constructor(props, state) {
    super({ elementTagName: 'aside', classList: styles.sidebar }, [], state);

    const ul = tag.ul({ classList: styles.sidebarLinkList });
    this.appendSingleChild(ul);

    const linkHandler = props?.callbacks?.linkHandler;

    LINKS.forEach((link) => {
      const li = tag.li();

      const sidebarLink = tag.a({
        classList: ['btn', styles.sidebarLink, 'action-large'],
        text: link.name,
        href: link.href,
      });

      if (linkHandler) {
        sidebarLink.addListener('click', (e) => {
          this.updateState({ isSidebarOpen: false });
          linkHandler(e);
        });
      }

      li.appendSingleChild(sidebarLink);
      this.linkElements[link.name] = sidebarLink;
      ul.appendSingleChild(li);
    });

    if (this.state) {
      this.currentState = {
        currentPage: this.state.stateObj.currentPage,
        isSidebarOpen: this.state.stateObj.isSidebarOpen,
      };

      this.subscribe(this.state, [
        this.updateSidebarActiveLink.bind(this),
        this.updateSidebarToggle.bind(this),
      ]);
      this.updateSidebarActiveLink(this.state.stateObj);
      this.updateSidebarToggle(this.state.stateObj);
    }
  }

  /**
   * A method to be called by publisher: updates styles of active link.
   * @param {StateObj} stateObj
   * @returns {void}
   */
  updateSidebarActiveLink(stateObj) {
    if (this.currentState.currentPage === stateObj.currentPage) return;

    const giftsLink = this.linkElements.gifts;

    if (stateObj.currentPage === '/gifts') {
      giftsLink.addClasses(styles.sidebarLinkActive);
    } else if (stateObj.currentPage === '/') {
      giftsLink.removeClasses(styles.sidebarLinkActive);
    }

    this.currentState.currentPage = stateObj.currentPage;
  }

  /**
   * A method to be called by publisher: opens or closes sidebar depending on a state.
   * @param {StateObj} stateObj
   * @returns {void}
   */
  updateSidebarToggle(stateObj) {
    if (this.currentState.isSidebarOpen === stateObj.isSidebarOpen) return;

    if (stateObj.isSidebarOpen) {
      this.addClasses(styles.sidebarActive);
      window.scrollTo(0, 0);
      document.body.classList.add('scroll-disabled');
      document.documentElement.classList.add('preserve-scroll-space');
    } else {
      this.removeClasses(styles.sidebarActive);
      document.body.classList.remove('scroll-disabled');
      document.documentElement.classList.remove('preserve-scroll-space');
    }

    this.currentState.isSidebarOpen = stateObj.isSidebarOpen;
  }
}
