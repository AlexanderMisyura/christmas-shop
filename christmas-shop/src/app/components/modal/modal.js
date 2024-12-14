import BaseComponent from '../base.js';
import tag from '../utilTags.js';

import * as styles from './modal.module.scss';

import closeIcon from './icons/close.svg';
import snowflakeIcon from './icons/snowflake.svg';
import svgChunkTemplate from '../svgChunkTemplate.js';

import workImg from './img/gift-for-work.png';
import healthImg from './img/gift-for-health.png';
import harmonyImg from './img/gift-for-harmony.png';

const EASING_FUNCTION = `linear(0 0%, 0 1.8%, 0.01 3.6%, 0.03 6.35%, 0.07 9.1%, 0.13 11.4%, 0.19 13.4%, 0.27 15%, 0.34 16.1%, 0.54 18.35%, 0.66 20.6%, 0.72 22.4%, 0.77 24.6%, 0.81 27.3%, 0.85 30.4%, 0.88 35.1%, 0.92 40.6%, 0.94 47.2%, 0.96 55%, 0.98 64%, 0.99 74.4%, 1 86.4%, 1 100%)`;

const relatedData = {
  'For Work': {
    imgSrc: workImg,
    imgAlt: "New Year's toy - a glass marble with a gift box inside",
    captionClass: 'text-work-category',
  },
  'For Health': {
    imgSrc: healthImg,
    imgAlt: "New Year's toy - a glass marble with a Snowman inside",
    captionClass: 'text-health-category',
  },
  'For Harmony': {
    imgSrc: harmonyImg,
    imgAlt: "New Year's toy - a glass marble with a New Year tree inside",
    captionClass: 'text-harmony-category',
  },
};

/**
 * Capitalizes the string argument.
 * @param {string} string
 * @returns {string}
 */
const capitalize = (string) => string[0].toUpperCase() + string.slice(1);

export default class Modal extends BaseComponent {
  /** @type {BaseComponent} */
  image;

  /** @type {BaseComponent} */
  category;

  /** @type {BaseComponent} */
  name;

  /** @type {BaseComponent} */
  description;

  /** @type {BaseComponent} */
  ratingBlock;

  /**
   * @param {State} state
   */
  constructor(state) {
    super({ elementTagName: 'dialog', classList: styles.modal }, [], state);

    const gift = this.state.stateObj.giftModal;

    const closeBtn = this.createModalCloseBtn();
    this.appendSingleChild(closeBtn);

    const image = this.createImage(gift);
    const header = this.createHeader(gift);
    const footer = this.createFooter(gift);

    const container = tag.div({ classList: styles.modalContainer }, [
      image,
      tag.div({ classList: styles.modalContent }, [header, footer]),
    ]);
    this.appendSingleChild(container);

    this.currentState = {
      currentPage: this.state.stateObj.currentPage,
      isModalOpen: this.state.stateObj.isModalOpen,
      giftModal: this.state.stateObj.giftModal,
    };

    this.subscribe(this.state, this.updateModal.bind(this));

    this.listenCloseModal();
  }

  /**
   * Creates button for closing modal.
   * @returns {BaseComponent}
   */
  createModalCloseBtn() {
    const closeBtn = tag.button({ classList: ['btn', styles.modalBtn] });
    const closeImg = svgChunkTemplate(closeIcon, 'icon-large');
    closeBtn.element.insertAdjacentHTML('afterbegin', closeImg);
    closeBtn.addListener('click', this.handleClose.bind(this));

    return closeBtn;
  }

  /**
   * Returns modal image.
   * @param {Gift | null} gift
   * @returns {BaseComponent}
   */
  createImage(gift) {
    this.image = tag.img({
      classList: styles.modalImage,
      src: relatedData[gift?.category]?.imgSrc || '',
      alt: relatedData[gift?.category]?.imgAlt || '',
    });

    return this.image;
  }

  /**
   * Returns modal header.
   * @param {Gift | null} gift
   * @returns {BaseComponent}
   */
  createHeader(gift) {
    this.category = tag.div({
      classList: ['heading-4', relatedData[gift?.category]?.captionClass || ''],
      text: gift?.category || '',
    });
    this.name = tag.div({
      classList: 'heading-3',
      text: gift?.name || '',
    });
    this.description = tag.div({
      classList: 'paragraph',
      text: gift?.description || '',
    });

    return tag.div({ classList: styles.modalHeader }, [
      this.category,
      this.name,
      this.description,
    ]);
  }

  /**
   * Returns modal footer.
   * @param {Gift | null} gift
   * @returns {BaseComponent}
   */
  createFooter(gift) {
    const ratingBlock = this.createRatingBlock(gift);
    const footer = tag.div({ classList: styles.modalFooter }, [
      tag.div({
        classList: 'heading-4',
        text: 'adds superpowers to:',
      }),
      ratingBlock,
    ]);

    return footer;
  }

  /**
   * Returns footer rating block.
   * @param {Gift | null} gift
   * @returns {BaseComponent}
   */
  createRatingBlock(gift) {
    let ratingLines;
    if (gift?.superpowers) {
      ratingLines = this.createRatingLines(gift);
    }

    this.ratingBlock = tag.div({ classList: styles.modalRating }, ratingLines);

    return this.ratingBlock;
  }

  /**
   * Returns footer rating block.
   * @param {Gift} gift
   * @returns {BaseComponent[]}
   */
  createRatingLines(gift) {
    return Object.entries(gift.superpowers).map(([name, score]) => {
      const iconsBlock = this.createIconsBlock(
        Number(gift?.superpowers[name][1])
      );

      const line = tag.div({ classList: styles.modalRatingLine }, [
        tag.div({ classList: 'paragraph', text: capitalize(name) }),
        tag.div({
          classList: 'paragraph',
          text: score,
        }),
        iconsBlock,
      ]);

      return line;
    });
  }

  /**
   * Returns icons block.
   * @param {number} score
   * @returns {BaseComponent}
   */
  createIconsBlock(score) {
    const iconsBlock = tag.div({
      classList: styles.modalIcons,
    });

    for (let i = 1; i <= 5; i++) {
      const lowerScoreClass = i > score ? styles.modalIconLowScore : '';
      const scoreImg = svgChunkTemplate(
        snowflakeIcon,
        `icon-small ${lowerScoreClass}`
      );
      iconsBlock.element.insertAdjacentHTML('beforeend', scoreImg);
    }
    return iconsBlock;
  }

  /**
   * Updates the state with modal close value.
   * @returns {void}
   */
  handleClose() {
    this.updateState({ isModalOpen: false });
  }

  /**
   * Closes modal.
   * @returns {void}
   */
  close() {
    document.body.classList.remove('modal-scroll-disabled');
    document.documentElement.classList.remove('modal-preserve-scroll-space');
    this.element.close();
  }

  /**
   * Opens modal.
   * @param {StateObj} stateObj
   * @returns {void}
   */
  open(stateObj) {
    this.fillModalData(stateObj.giftModal);
    this.animateModal(stateObj.cardCenterCoords);
    document.body.classList.add('modal-scroll-disabled');
    document.documentElement.classList.add('modal-preserve-scroll-space');
    this.element.showModal();
  }

  /**
   * A method to be called by publisher: updates the modal open / close state.
   * @param {StateObj} stateObj
   * @returns {void}
   */
  updateModal(stateObj) {
    if (
      this.currentState.giftModal === stateObj.giftModal ||
      this.currentState.isModalOpen === stateObj.isModalOpen
    )
      return;

    if (stateObj.isModalOpen) {
      this.open(stateObj);
    }

    if (!stateObj.isModalOpen) {
      this.close();
    }

    this.currentState.isModalOpen = stateObj.isModalOpen;
    this.currentState.currentPage = stateObj.currentPage;
  }

  /**
   * Fills modal with card data.
   * @param {Gift | null} gift
   * @returns {void}
   */
  fillModalData(gift) {
    if (!gift) return;

    this.image.element.src = relatedData[gift.category].imgSrc;
    this.image.element.alt = relatedData[gift.category].imgAlt;
    this.category.addClasses(relatedData[gift.category].captionClass);
    this.category.setText(gift.category);
    this.name.setText(gift.name);
    this.description.setText(gift.description);
    this.ratingBlock.element.replaceChildren(
      ...this.createRatingLines(gift).map((component) => component.element)
    );
  }

  /**
   * Adds listener to close modal by clicking on backdrop.
   * Adds listener to update the state if modal was closed by other means (ESC key).
   * @returns {void}
   */
  listenCloseModal() {
    this.element.addEventListener('close', () =>
      this.updateState({ isModalOpen: false })
    );
    this.element.addEventListener('click', (e) => {
      if (e.target === e.currentTarget) {
        this.updateState({ isModalOpen: false });
      }
    });
  }

  /**
   * Animates modal.
   * @param {CardCenterCoords} cardCenter
   * @returns {void}
   */
  animateModal(cardCenter) {
    this.element.animate(
      [
        {
          top: `${cardCenter.y}px`,
          left: `${cardCenter.x}px`,
          transform: 'translate(-50%, -50%) scale(0.7)',
          opacity: 0,
        },
        {
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%) scale(1)',
          opacity: 1,
        },
      ],
      {
        duration: 700,
        easing: EASING_FUNCTION,
      }
    );

    function generateKeyframes() {
      const keyframes = [];
      const frames = 30;
      const damping = 3;
      const maxAngle = 25;
      const maxTranslateX = 80;

      for (let i = 1; i <= frames; i++) {
        const progress = i / frames;
        const angle =
          Math.sin(progress * Math.PI * 6) * Math.exp(-damping * progress);
        const translateX =
          Math.sin(progress * Math.PI * 6) *
          maxTranslateX *
          Math.exp(-damping * progress);
        keyframes.push({
          transform: `rotate(${angle * maxAngle}deg) translate(${-translateX}px)`,
        });
      }

      return keyframes;
    }

    const keyframes = generateKeyframes();

    this.image.element.animate(keyframes, {
      duration: 1000,
    });
  }
}
