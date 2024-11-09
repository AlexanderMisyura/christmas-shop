import { checkIsHomePage } from "./utils";

export default class CardGenerator {
  card;
  constructor(params, modal) {
    this.generateCard(params, modal);
  }

  generateCard(params, modal) {
    const { name, category } = params;

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

    this.card = document.createElement('button');
    this.card.classList.add('card');
    this.card.popoverTargetElement = modal;

    const cardImg = document.createElement('img');
    cardImg.classList.add('card__img');
    cardImg.src = relatedData[category].imgSrc;
    cardImg.alt = relatedData[category].imgAlt;

    const cardFooter = document.createElement('div');
    cardFooter.classList.add('card__footer');

    const cardCaption = document.createElement('span');
    cardCaption.classList.add(
      'card__caption',
      'heading-4',
      relatedData[category].captionClass
    );
    cardCaption.textContent = category;

    const cardHeading = document.createElement('h3');
    cardHeading.classList.add('card__heading', 'heading-3');
    cardHeading.textContent = name;

    cardFooter.append(cardCaption, cardHeading);
    this.card.append(cardImg, cardFooter);
  }

  getCard() {
    return this.card;
  }
}
