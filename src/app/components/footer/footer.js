/// <reference types="../../../types/types.d.ts" />

import BaseComponent from '../base.js';
import tag from '../utilTags.js';
import ContactCard from '../contactCard/contactCard.js';

import * as styles from './footer.module.scss';

import christmasTree from './icons/christmas-tree.svg';
import santaClaus from './icons/santa-claus.svg';
import snake from './icons/snake.svg';

import telegram from './icons/telegram.svg';
import facebook from './icons/facebook.svg';
import instagram from './icons/instagram.svg';
import x from './icons/x.svg';

import svgChunkTemplate from '../svgChunkTemplate.js';

const SOCIAL_LINKS = [
  { href: 'https://www.telegram.org/', icon: telegram },
  { href: 'https://www.facebook.com/', icon: facebook },
  { href: 'https://www.instagram.com/', icon: instagram },
  { href: 'https://x.com/', icon: x },
];

const CONTACTS = [
  {
    href: 'tel:+375291112233',
    icon: santaClaus,
    heading: '+375 (29) 111-22-33',
    cta: 'call us',
  },
  {
    href: 'https://maps.app.goo.gl/Deh5gvQ1Zw6eexqo7',
    icon: christmasTree,
    heading: 'Magic forest',
    cta: 'meet us',
  },
  {
    href: 'mailto:gifts@magic.com',
    icon: snake,
    heading: 'gifts@magic.com',
    cta: 'write us',
  },
];

export default class Footer extends BaseComponent {
  constructor() {
    super({ elementTagName: 'footer', id: 'contacts' });

    const wrapper = tag.div({ classList: ['wrapper'] });
    this.appendSingleChild(wrapper);

    const socialLinks = this.createSocialLinks();
    const contactCards = this.createContactCards();

    const container = tag.div(
      {
        classList: ['main-container', styles.footerContainer],
      },
      [
        tag.ul({ classList: styles.footerContacts }, contactCards),
        tag.div({ classList: styles.footerCopy }, [
          tag.ul({ classList: styles.footerSocial }, socialLinks),
          tag.div({
            classList: 'paragraph',
            text: '© Copyright 2025, All Rights Reserved',
          }),
          tag.a({
            classList: [styles.footerLink, 'caption'],
            href: 'https://rs.school/',
            target: '_blank',
            text: 'Made in Rolling Scopes School',
          }),
        ]),
      ]
    );

    wrapper.appendSingleChild(container);
  }

  /**
   * Returns a list of social links.
   * @returns {BaseComponent[]}
   */
  createSocialLinks() {
    return SOCIAL_LINKS.map((item) => {
      const socialImg = svgChunkTemplate(item.icon, 'icon-medium');

      const socialLink = tag.a({
        classList: styles.footerSocialIcon,
        href: item.href,
        target: '_blank',
      });

      socialLink.element.insertAdjacentHTML('afterbegin', socialImg);

      const listItem = tag.li({}, socialLink);

      return listItem;
    });
  }

  /**
   * Returns a list of contact cards.
   * @returns {ContactCard[]}
   */
  createContactCards() {
    return CONTACTS.map((item) => new ContactCard(item));
  }
}
