import gifts from '../gifts.json';
import { checkIsHomePage } from './utils';

const EASING_FUNCTION = `linear(0 0%, 0 1.8%, 0.01 3.6%, 0.03 6.35%, 0.07 9.1%, 0.13 11.4%, 0.19 13.4%, 0.27 15%, 0.34 16.1%, 0.54 18.35%, 0.66 20.6%, 0.72 22.4%, 0.77 24.6%, 0.81 27.3%, 0.85 30.4%, 0.88 35.1%, 0.92 40.6%, 0.94 47.2%, 0.96 55%, 0.98 64%, 0.99 74.4%, 1 86.4%, 1 100%)`;
const SNOWFLAKE_ICON = './assets/icons/snowflake-16x16.svg';
const SNOWFLAKE_ICON_PALE = './assets/icons/snowflake-16x16-pale.svg';

const pathAddition = checkIsHomePage() ? '' : '.';

const relatedData = {
  'For Work': {
    imgSrc: `${pathAddition}./assets/img/gift-for-work.png`,
    imgAlt: "New Year's toy - a glass marble with a gift box inside",
    captionClass: 'text-purple',
  },
  'For Health': {
    imgSrc: `${pathAddition}./assets/img/gift-for-health.png`,
    imgAlt: "New Year's toy - a glass marble with a Snowman inside",
    captionClass: 'text-green',
  },
  'For Harmony': {
    imgSrc: `${pathAddition}./assets/img/gift-for-harmony.png`,
    imgAlt: "New Year's toy - a glass marble with a New Year tree inside",
    captionClass: 'text-pink',
  },
};
export default class Modal {
  constructor() {
    this.cards = document.querySelector('.cards');
    this.modal = document.querySelector('.modal');
    this.modalContainer = this.modal.querySelector('.modal__container');
    this.modalImage = this.modal.querySelector('.modal__image');
    this.modalCategory = this.modal.querySelector('.modal__category');
    this.modalHeading = this.modal.querySelector('.modal__heading');
    this.modalText = this.modal.querySelector('.modal__text');
    this.modalScoreLive = this.modal.querySelector('.modal__score_live');
    this.modalIconsList = [...this.modal.querySelectorAll('.modal__icons')];

    this.modal.addEventListener('toggle', Modal.handleScroll);
  }

  static getStartAnimationPosition(card) {
    const cardRect = card.getBoundingClientRect();

    return {
      x: cardRect.x + cardRect.width / 2,
      y: cardRect.y + cardRect.height / 2,
    };
  }

  animateCard(startCard) {
    const startPosition = Modal.getStartAnimationPosition(startCard);

    this.modal.animate(
      [
        {
          top: `${startPosition.y}px`,
          left: `${startPosition.x}px`,
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
        fill: 'forwards',
      }
    );

    function animateImage() {
      const viewportCenter = {
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
      };

      const viewportHalfDiagonal = Math.hypot(
        viewportCenter.x,
        viewportCenter.y
      );

      const distanceFromStartToCenter = Math.hypot(
        Math.abs(viewportCenter.x - startPosition.x),
        Math.abs(viewportCenter.y - startPosition.y)
      );

      const intensityPercentage =
        (distanceFromStartToCenter / viewportHalfDiagonal) * 100;

      function generateKeyframes(intensity) {
        const keyframes = [];
        const frames = 30;
        const damping = 3;
        const maxAngle = 15 + intensity / 4;
        const maxTranslateX = intensity + 30;

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

      const keyframes = generateKeyframes(intensityPercentage);

      this.modalImage.animate(keyframes, {
        duration: 1000,
        fill: 'forwards',
      });
    }

    animateImage.call(this);
  }

  handleModal(e) {
    const card = e.target.closest('.card');
    if (!card) return;

    const { cardName } = card.dataset;
    const cardData = gifts.find((cardItem) => cardItem.name === cardName);

    this.fillCardData(cardData);
    this.animateCard(card);
  }

  static handleScroll() {
    const widthBeforeToggle = document.documentElement.clientWidth;
    document.body.classList.toggle('modal-scroll-disabled');
    const widthAfterToggle = document.documentElement.clientWidth;
    const scrollbarWidth = widthAfterToggle - widthBeforeToggle;
    document.body.style.paddingRight = `${scrollbarWidth > 0 ? scrollbarWidth : 0}px`;
  }

  clearModal() {
    this.modalImage.src = '';
    this.modalImage.alt = '';

    Object.values(relatedData).forEach((data) =>
      this.modalCategory.classList.remove(data.captionClass)
    );

    this.modalIconsList.forEach((items) =>
      [...items.children].forEach((item) => item.remove())
    );
  }

  fillCardData(cardData) {
    this.clearModal();

    this.modalImage.classList.add('modal__image');
    this.modalImage.src = relatedData[cardData.category].imgSrc;
    this.modalImage.alt = relatedData[cardData.category].imgAlt;

    this.modalCategory.textContent = cardData.category;
    this.modalCategory.classList.add(
      relatedData[cardData.category].captionClass
    );
    this.modalHeading.textContent = cardData.name;
    this.modalText.textContent = cardData.description;
    this.modalScoreLive.textContent = cardData.superpowers.live;

    Object.entries(cardData.superpowers).forEach(([power, score]) => {
      const scoreElem = this.modal.querySelector(`.modal__score_${power}`);
      scoreElem.textContent = score;
      const scoreNum = Number(cardData.superpowers[power][1]);
      const scoreIcons = this.modal.querySelector(`.modal__icons_${power}`);

      for (let i = 1; i <= 5; i++) {
        const img = document.createElement('img');

        if (i <= scoreNum) {
          img.src = `${pathAddition}${SNOWFLAKE_ICON}`;
          img.alt = 'snowflake icon';
        } else {
          img.src = `${pathAddition}${SNOWFLAKE_ICON_PALE}`;
          img.alt = 'pale snowflake icon';
        }

        scoreIcons.append(img);
      }
    });
  }

  listen() {
    this.cards.addEventListener('click', this.handleModal.bind(this));
  }
}
