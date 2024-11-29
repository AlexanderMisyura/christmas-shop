import CardGenerator from './generateCard';
import gifts from '../gifts.json';
import { checkIsHomePage, shuffle } from './utils';

export default class Gifts {
  container = document.querySelector('.cards');
  modal = document.querySelector('.modal');
  tabs = document.querySelector('.tabs');
  data = gifts;

  constructor(category = 'all') {
    this.refillCardsContainer(category);
  }

  refillCardsContainer(category) {
    this.clearCardsContainer();

    let outputData;

    if (checkIsHomePage()) {
      outputData = shuffle(this.data).slice(0, 4);
    } else if (category === 'all') {
      outputData = this.data;
    } else {
      outputData = this.data.filter((item) => item.category === category);
    }

    const cards = this.generateCards(outputData);
    this.container.append(...cards);
  }

  generateCards(data) {
    return data.map((item) =>
      new CardGenerator(
        {
          name: item.name,
          category: item.category,
        },
        modal
      ).getCard()
    );
  }

  clearCardsContainer() {
    this.container.innerHTML = '';
  }

  handleTabs(e) {
    const tab = e.target.closest('.tab');
    if (!tab || tab.classList.contains('gifts__tab_active')) {
      return;
    }

    const category = tab.dataset.category;
    this.refillCardsContainer(category);

    [...this.tabs.children].forEach((tab) =>
      tab.classList.remove('gifts__tab_active')
    );

    tab.classList.add('gifts__tab_active');
  }

  listen() {
    if (checkIsHomePage()) return;
    this.tabs.addEventListener('click', this.handleTabs.bind(this));
  }
}
