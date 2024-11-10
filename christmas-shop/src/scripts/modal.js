import gifts from '../gifts.json';
import { checkIsHomePage } from './utils';

export default class Modal {
  pathAddition = checkIsHomePage() ? '' : '.';
  relatedData = {
    'For Work': {
      imgSrc: `${this.pathAddition}./assets/img/gift-for-work.png`,
      imgAlt: "New Year's toy - a glass marble with a gift box inside",
      captionClass: 'text-purple',
    },
    'For Health': {
      imgSrc: `${this.pathAddition}./assets/img/gift-for-health.png`,
      imgAlt: "New Year's toy - a glass marble with a Snowman inside",
      captionClass: 'text-green',
    },
    'For Harmony': {
      imgSrc: `${this.pathAddition}./assets/img/gift-for-harmony.png`,
      imgAlt: "New Year's toy - a glass marble with a New Year tree inside",
      captionClass: 'text-pink',
    },
  };
  constructor() {
    this.create();
  }
  create() {
    this.cards = document.querySelector('.cards');
    this.modal = document.querySelector('.modal');
    this.modalContainer = this.modal.querySelector('.modal__container');
    this.modalImage = this.modal.querySelector('.modal__image');
    this.modalCategory = this.modal.querySelector('.modal__category');
    this.modalHeading = this.modal.querySelector('.modal__heading');
    this.modalText = this.modal.querySelector('.modal__text');
    this.modalScoreLive = this.modal.querySelector('.modal__score_live');
    this.modalIconsList = [...this.modal.querySelectorAll('.modal__icons')];

    this.modal.addEventListener('toggle', this.handleScroll);
  }

  handleModal(e) {
    const card = e.target.closest('.card');
    if (!card) return;

    const cardName = card.dataset.cardName;
    const cardData = gifts.find((card) => card.name === cardName);

    this.fillCardData(cardData);
  }

  handleScroll() {
    const widthBeforeToggle = document.documentElement.clientWidth;
    document.body.classList.toggle('modal-scroll-disabled');
    const widthAfterToggle = document.documentElement.clientWidth;
    const scrollbarWidth = widthAfterToggle - widthBeforeToggle;
    document.body.style.paddingRight = `${scrollbarWidth > 0 ? scrollbarWidth : 0}px`;
  }

  clearModal() {
    this.modalImage.src = '';
    this.modalImage.alt = '';

    for (let [_, data] of Object.entries(this.relatedData)) {
      this.modalCategory.classList.remove(data.captionClass);
    }
    this.modalIconsList.forEach((items) =>
      [...items.children].forEach((item) => item.remove())
    );
  }

  fillCardData(cardData) {
    this.clearModal();

    this.modalImage.classList.add('modal__image');
    this.modalImage.src = this.relatedData[cardData.category].imgSrc;
    this.modalImage.alt = this.relatedData[cardData.category].imgAlt;

    this.modalCategory.textContent = cardData.category;
    this.modalCategory.classList.add(
      this.relatedData[cardData.category].captionClass
    );
    this.modalHeading.textContent = cardData.name;
    this.modalText.textContent = cardData.description;
    this.modalScoreLive.textContent = cardData.superpowers.live;

    for (let [power, score] of Object.entries(cardData.superpowers)) {
      const scoreElem = this.modal.querySelector(`.modal__score_${power}`);
      scoreElem.textContent = score;
      const scoreNum = Number(cardData.superpowers[power][1]);
      const scoreIcons = this.modal.querySelector(`.modal__icons_${power}`);

      for (let i = 1; i <= 5; i++) {
        const img = document.createElement('img');

        if (i <= scoreNum) {
          img.src = `${this.pathAddition}./assets/icons/snowflake-16x16.svg`;
          img.alt = 'snowflake icon';
        } else {
          img.src = `${this.pathAddition}./assets/icons/snowflake-16x16-pale.svg`;
          img.alt = 'pale snowflake icon';
        }

        scoreIcons.append(img);
      }
    }
  }

  listen() {
    this.cards.addEventListener('click', this.handleModal.bind(this));
  }
}
