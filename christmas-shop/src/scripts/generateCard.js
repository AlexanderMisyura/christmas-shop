export default class CardGenerator {
  card;
  constructor(params) {
    this.generateCard(params);
  }

  generateCard(params) {
    const { name, category } = params;

    const pathAddition = window.location.href.includes('/gifts/') ? '.' : '';

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

    const cardImg = document.createElement('img');
    cardImg.classList.add('card__img');
    cardImg.src = relatedData[category].imgSrc;
    cardImg.alt = relatedData[category].imgAlt;

    const cardFooter = document.createElement('span');
    cardFooter.classList.add('card__footer');

    const cardCaption = document.createElement('span');
    cardCaption.classList.add(
      'card__caption',
      'heading-4',
      relatedData[category].captionClass
    );
    cardCaption.textContent = category;

    const cardHeading = document.createElement('span');
    cardHeading.classList.add('card__heading', 'heading-3');
    cardHeading.textContent = name;

    cardFooter.append(cardCaption, cardHeading);
    this.card.append(cardImg, cardFooter);
  }

  getCard() {
    return this.card;
  }
}
